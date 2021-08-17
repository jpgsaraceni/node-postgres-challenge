export default function QueryBuilder() {
  function buildSelect(_expression = '*', _table, _condition = '') {
    if (/\s/g.test(_table)) {
      let query = `SELECT ${_expression} FROM ${_table}`;
      if (_condition) query += ` WHERE ${_condition}`;
    } else {
      return false;
    };
  }

  return {
    buildSelect,
  }
}