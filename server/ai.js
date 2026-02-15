const linkedListText = `A linked list is a linear data structure built from individual nodes that point to one another, rather than being stored in contiguous memory. Each node holds two pieces of information: the data itself and a reference to the next node. This design makes insertion and deletion operations efficient because you only need to adjust pointers, not shift large blocks of memory. In practice, you keep a head pointer that marks the start of the list, and you traverse nodes one by one until you reach a null reference. This traversal is simple but means random access is slower than in arrays.

A basic example is a list of student roll numbers: 101 -> 105 -> 109. Each node stores a roll number and a pointer to the next roll number. To insert a new roll number between 105 and 109, you create a node 107 and update pointers so 105 points to 107 and 107 points to 109. This small pointer change is why linked lists are preferred for workloads with frequent insertions and deletions. Removing an element is similarly efficient because you only need to bypass the removed node and reconnect its neighbors.

There are common variants of linked lists. A singly linked list points forward only, while a doubly linked list has both next and previous pointers, making it easier to traverse backward. A circular linked list connects the last node back to the head, which is useful for round robin scheduling or buffer management. These variations trade additional memory and pointer maintenance for convenience and speed in specific operations. For example, a doubly linked list adds extra space for the previous pointer but enables constant-time deletion if you have a direct reference to a node.

Time complexity helps explain when linked lists shine. Accessing an element by index is O(n) because you must traverse from the head, but inserting or deleting at the head is O(1). If you maintain a tail pointer, appending becomes O(1) too. Searching remains O(n). Compared with arrays, linked lists avoid costly resizing and shifting, but they do incur pointer overhead and reduce cache locality. That is why linked lists are ideal when data size is unpredictable and changes often, while arrays are best for fast indexed access.

In real systems, linked lists appear in memory allocation, adjacency lists in graphs, and implementing stacks or queues. A queue, for example, can use a linked list so enqueue and dequeue operations are both O(1). The flexibility of nodes, the ability to grow dynamically, and the simplicity of pointer updates make linked lists a foundational structure that every programmer should understand. When you combine these concepts with good traversal patterns and careful pointer handling, linked lists become a reliable tool for building efficient, maintainable programs.`;

const normalizationText = `Normalization is the process of organizing data in relational databases to reduce redundancy and improve integrity. The goal is to structure tables so that each fact is stored in exactly one place, making updates safer and queries more reliable. Normalization is achieved by applying a sequence of normal forms, each with a specific rule set. While normalization can lead to more tables and joins, it prevents anomalies like duplicated values, inconsistent updates, and accidental deletions.

First Normal Form (1NF) requires that each column contain atomic values and that each row is unique. This means you should not store multiple values in one field, such as a list of phone numbers in a single column. Instead, each phone number becomes a separate row or moves into another related table. Second Normal Form (2NF) builds on 1NF and requires that non-key attributes depend on the whole primary key, not just part of it. This is especially important in tables with composite keys, where partial dependency leads to repeated data.

Third Normal Form (3NF) removes transitive dependencies, which occur when a non-key attribute depends on another non-key attribute. For example, if a table stores student ID, department ID, and department name, the department name depends on department ID rather than the student. Moving department details to a separate table eliminates that redundancy. Boyce-Codd Normal Form (BCNF) strengthens 3NF by requiring that every determinant is a candidate key, further reducing anomalies in more complex relationships.

A small example makes this clear. Suppose you store student data and course data in a single table: student ID, student name, course ID, course name, and instructor. Every time a course appears, the course name and instructor repeat. Normalization would split this into a student table, a course table, and a registration table that links students to courses. This design reduces duplication, so updating an instructor name occurs in one place instead of many.

Normalization is not about blindly creating many tables; it is about balancing structure and performance. Highly normalized schemas are cleaner and safer, but they can introduce overhead from joins in heavy read systems. In practice, database designers often normalize to 3NF or BCNF and then selectively denormalize for performance where needed. Understanding the normal forms allows you to design systems that are both scalable and consistent, which is the core objective of database engineering.`;

function generateSubmission({ title, description }) {
  const lowerTitle = (title || "").toLowerCase();
  const lowerDescription = (description || "").toLowerCase();

  if (lowerTitle.includes("data structures") || lowerDescription.includes("linked list")) {
    return linkedListText;
  }

  if (lowerTitle.includes("dbms") || lowerDescription.includes("normalization")) {
    return normalizationText;
  }

  return `This submission covers the requested topic: ${title || "General topic"}. It includes definitions, key concepts, and practical examples, organized in a clear academic structure.`;
}

module.exports = {
  generateSubmission
};
