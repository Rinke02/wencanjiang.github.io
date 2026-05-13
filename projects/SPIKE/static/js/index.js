window.HELP_IMPROVE_VIDEOJS = false;

function parseSortableValue(text) {
  var raw = text.trim();
  var stripped = raw.replace(/\s*\+\/-\s*.*$/, "").trim();
  var match = stripped.match(/-?\d+(?:\.\d+)?(?:[kKmM])?/);

  if (match) {
    var token = match[0];
    var value = parseFloat(token.replace(/[kKmM]$/, ""));
    if (/[kK]$/.test(token)) value *= 1000;
    if (/[mM]$/.test(token)) value *= 1000000;
    return { type: "number", value: value };
  }

  return { type: "text", value: stripped.toLowerCase() };
}

function sortTable(table, columnIndex, ascending, header) {
  var tbody = table.tBodies[0];
  if (!tbody) return;

  var rows = Array.from(tbody.rows);
  rows.sort(function (rowA, rowB) {
    var cellA = rowA.cells[columnIndex];
    var cellB = rowB.cells[columnIndex];
    var valueA = parseSortableValue(cellA ? cellA.textContent : "");
    var valueB = parseSortableValue(cellB ? cellB.textContent : "");

    if (valueA.type === "number" && valueB.type === "number") {
      return ascending ? valueA.value - valueB.value : valueB.value - valueA.value;
    }

    return ascending
      ? valueA.value.localeCompare(valueB.value)
      : valueB.value.localeCompare(valueA.value);
  });

  rows.forEach(function (row) {
    tbody.appendChild(row);
  });

  Array.from(tbody.rows).forEach(function (row, index) {
    if (row.cells[0]) row.cells[0].textContent = index + 1;
  });

  table.querySelectorAll("td").forEach(function (cell) {
    cell.classList.remove("active-column");
  });

  Array.from(tbody.rows).forEach(function (row) {
    var cell = row.cells[columnIndex];
    if (cell) cell.classList.add("active-column");
  });

  table.querySelectorAll("th").forEach(function (th) {
    th.classList.remove("js-sort-active", "js-sort-asc", "js-sort-desc");
  });

  if (header) {
    header.classList.add("js-sort-active");
    header.classList.add(ascending ? "js-sort-asc" : "js-sort-desc");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".js-sort-table").forEach(function (table) {
    var headers = table.querySelectorAll("th[data-column-index]");
    headers.forEach(function (header) {
      header.addEventListener("click", function () {
        var columnIndex = Number.parseInt(header.dataset.columnIndex, 10);
        if (Number.isNaN(columnIndex)) return;
        var ascending = !header.classList.contains("js-sort-asc");
        sortTable(table, columnIndex, ascending, header);
      });
    });

    var defaultColumn = Number.parseInt(table.dataset.defaultSort || "2", 10);
    if (!Number.isNaN(defaultColumn)) {
      var defaultHeader = table.querySelector('th[data-column-index="' + defaultColumn + '"]');
      if (defaultHeader) {
        sortTable(table, defaultColumn, false, defaultHeader);
      }
    }
  });
});
