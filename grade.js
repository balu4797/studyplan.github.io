document.getElementById('addRowBtn').addEventListener('click', () => {
  const table = document.getElementById('marksTable').getElementsByTagName('tbody')[0];
  const newRow = table.insertRow();

  const subjectCell = newRow.insertCell(0);
  const marksCell = newRow.insertCell(1);
  const actionCell = newRow.insertCell(2);

  subjectCell.contentEditable = "true";
  marksCell.contentEditable = "true";

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.addEventListener('click', () => {
    newRow.remove();
  });

  actionCell.appendChild(deleteBtn);
});
document.querySelectorAll('.delete-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.target.closest('tr').remove();
  });
});
