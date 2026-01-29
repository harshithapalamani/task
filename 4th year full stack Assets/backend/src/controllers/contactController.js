const Contact = require('../models/Contact');

function buildContactFilterAndSort(query) {
  const q = (query.q || '').trim();
  const filter = {};
  if (q) {
    const rx = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    filter.$or = [
      { fullName: rx },
      { email: rx },
      { mobile: rx },
      { city: rx },
    ];
  }

  const sortable = new Set(['createdAt', 'fullName', 'email', 'city']);
  const sortBy = sortable.has(query.sortBy) ? query.sortBy : 'createdAt';
  const sortDir = query.sortDir === 'asc' ? 1 : -1;
  const sort = { [sortBy]: sortDir };

  return { filter, sort };
}

async function listContacts(req, res, next) {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limitRaw = parseInt(req.query.limit, 10) || 10;
    const limit = Math.min(Math.max(limitRaw, 1), 100);
    const { filter, sort } = buildContactFilterAndSort(req.query);

    const [items, total] = await Promise.all([
      Contact.find(filter)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit),
      Contact.countDocuments(filter),
    ]);

    res.json({
      data: items,
      total,
      page,
      pages: Math.max(Math.ceil(total / limit), 1),
      limit,
    });
  } catch (err) {
    next(err);
  }
}

async function exportContacts(req, res, next) {
  try {
    const { filter, sort } = buildContactFilterAndSort(req.query);
    const items = await Contact.find(filter).sort(sort).lean();

    const rows = [
      ['Full Name', 'Email', 'Mobile', 'City', 'Created At'],
      ...items.map((c) => [
        c.fullName || '',
        c.email || '',
        c.mobile || '',
        c.city || '',
        c.createdAt ? new Date(c.createdAt).toISOString() : '',
      ]),
    ];

    const escapeCSV = (val) => {
      const s = String(val);
      if (/[",\n]/.test(s)) {
        return '"' + s.replace(/"/g, '""') + '"';
      }
      return s;
    };

    const csv = rows.map((r) => r.map(escapeCSV).join(',')).join('\n');
    const filename = `contacts_export_${Date.now()}.csv`;
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send('\uFEFF' + csv);
  } catch (err) {
    next(err);
  }
}

async function createContact(req, res, next) {
  try {
    const { fullName, email, mobile, city } = req.body;
    if (!fullName || !email || !mobile || !city) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    const created = await Contact.create({ fullName, email, mobile, city });
    res.status(201).json({ message: 'Submitted successfully', data: created });
  } catch (err) {
    next(err);
  }
}

module.exports = { listContacts, createContact, exportContacts };
