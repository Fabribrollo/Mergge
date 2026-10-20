-- Tabla de leads del formulario /form.
-- Columnas en snake_case, 1:1 con leadSchema (packages/shared).
-- problemas, objetivos y valora son arrays: D1 (SQLite) no tiene tipo array,
-- se guardan como JSON en texto (ej: '["a","b"]').
CREATE TABLE IF NOT EXISTS leads (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  nombre        TEXT NOT NULL,
  empresa       TEXT NOT NULL,
  rubro         TEXT,
  email         TEXT NOT NULL,
  whatsapp      TEXT,
  web_actual    TEXT,
  links         TEXT,
  problemas     TEXT NOT NULL DEFAULT '[]',
  objetivos     TEXT NOT NULL DEFAULT '[]',
  tipo_proyecto TEXT,
  autogestion   TEXT,
  material      TEXT,
  plazo         TEXT,
  presupuesto   TEXT,
  decisor       TEXT,
  como_llego    TEXT,
  valora        TEXT NOT NULL DEFAULT '[]',
  comentario    TEXT
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at);
