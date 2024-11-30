let students = [];
let filteredStudents = [];
let hasSearched = false;
let currentPage = 1;
const resultsPerPage = 10;

fetch('mock.json')
  .then(response => response.json())
  .then(data => {
    students = data;
    displayStudents();
  })
  .catch(error => console.error('Error fetching student data:', error));

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const clearSearchButton = document.getElementById('clearSearchButton');
const filterButton = document.getElementById('filterButton');
const dropdown = document.getElementById('dropdown');
const resultsSection = document.getElementById('resultsSection');
const studentListElement = document.getElementById('studentList').getElementsByTagName('tbody')[0];
const filterModal = document.getElementById('filterModal');
const saveFilterButton = document.getElementById('saveFilterButton');
const majorInput = document.getElementById('majorInput');
const collegeInput = document.getElementById('collegeInput');
const classificationInput = document.getElementById('classificationInput');
const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');

function filterStudents() {
  const major = majorInput.value.toLowerCase().trim();
  const college = collegeInput.value.toLowerCase().trim();
  const classification = classificationInput.value.toLowerCase().trim();

  filteredStudents = students.filter(student => {
    return (
      (major === '' || student.major.toLowerCase().includes(major)) &&
      (college === '' || student.college.toLowerCase().includes(college)) &&
      (classification === '' || student.classification.toLowerCase().includes(classification))
    );
  });

  filterModal.style.display = 'none';
  currentPage = 1; 
  displayStudents();
}

function displayStudents() {
  studentListElement.innerHTML = '';
  const start = (currentPage - 1) * resultsPerPage;
  const end = start + resultsPerPage;
  const pageResults = filteredStudents.slice(start, end);

  pageResults.forEach(student => {
    const row = document.createElement('tr');
    row.innerHTML = 
    //   <td>${student.first_name} ${student.last_name}</td>
    //   <td>${student.id}</td>
    //   <td>${student.major}</td>
    //   <td>${student.college}</td>
    //   <td>${student.classification}</td>
    //   <td>${student.first_name.charAt(0).toLowerCase() + student.last_name.toLowerCase()}@tnstate.edu</td>
    //;
    studentListElement.appendChild(row);
  });

  resultsSection.style.display = filteredStudents.length > 0 && hasSearched ? 'block' : 'none';
  prevPageButton.style.display = currentPage > 1 ? 'inline-block' : 'none';
  nextPageButton.style.display = currentPage * resultsPerPage < filteredStudents.length ? 'inline-block' : 'none';
}

searchButton.addEventListener('click', () => {
  hasSearched = true;
  filteredStudents = students.filter(student => {
    return (
      student.first_name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      student.last_name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      student.major.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      student.college.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      student.classification.toLowerCase().includes(searchInput.value.toLowerCase())
    );
  });
  currentPage = 1; 
  displayStudents();
});

clearSearchButton.addEventListener('click', () => {
  searchInput.value = '';
  filteredStudents = [];
  displayStudents();
});

filterButton.addEventListener('click', () => {
  filterModal.style.display = 'flex';
});

saveFilterButton.addEventListener('click', filterStudents);

window.addEventListener('click', (e) => {
  if (e.target === filterModal) {
    filterModal.style.display = 'none';
  }
});

prevPageButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    displayStudents();
  }
});

nextPageButton.addEventListener('click', () => {
  if (currentPage * resultsPerPage < filteredStudents.length) {
    currentPage++;
    displayStudents();
  }
});
