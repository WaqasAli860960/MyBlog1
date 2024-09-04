// script.js

// DOM Elements
const blogPosts = document.getElementById('blogPosts');
const addBlogBtn = document.getElementById('addBlogBtn');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const imageUpload = document.getElementById('imageUpload');

// Load Blogs from Local Storage
document.addEventListener('DOMContentLoaded', loadBlogs);

// Add Blog
addBlogBtn.addEventListener('click', addBlog);

// Functions
function loadBlogs() {
    const blogs = getBlogsFromLocalStorage();
    blogs.forEach(blog => displayBlog(blog));
}

function addBlog() {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    const image = imageUpload.files[0] ? URL.createObjectURL(imageUpload.files[0]) : '';

    if (title && content) {
        const blog = { title, content, image };
        saveBlogToLocalStorage(blog);
        displayBlog(blog);
        clearInputs();
    } else {
        alert('Please enter a title and content');
    }
}

function displayBlog(blog) {
    const blogPost = document.createElement('div');
    blogPost.classList.add('blog-post');
    blogPost.innerHTML = `
        <img src="${blog.image}" alt="Blog Image">
        <h3>${blog.title}</h3>
        <p>${blog.content}</p>
        <div class="actions">
            <button onclick="editBlog(this)">Edit</button>
            <button onclick="deleteBlog(this)">Delete</button>
        </div>
    `;
    blogPosts.appendChild(blogPost);
}

function saveBlogToLocalStorage(blog) {
    const blogs = getBlogsFromLocalStorage();
    blogs.push(blog);
    localStorage.setItem('blogs', JSON.stringify(blogs));
}

function getBlogsFromLocalStorage() {
    return localStorage.getItem('blogs') ? JSON.parse(localStorage.getItem('blogs')) : [];
}

function clearInputs() {
    titleInput.value = '';
    contentInput.value = '';
    imageUpload.value = '';
}

function editBlog(button) {
    const blogPost = button.closest('.blog-post');
    const title = blogPost.querySelector('h3').innerText;
    const content = blogPost.querySelector('p').innerText;

    titleInput.value = title;
    contentInput.value = content;
    deleteBlog(button);
}

function deleteBlog(button) {
    const blogPost = button.closest('.blog-post');
    const title = blogPost.querySelector('h3').innerText;

    blogPosts.removeChild(blogPost);
    removeBlogFromLocalStorage(title);
}

function removeBlogFromLocalStorage(title) {
    let blogs = getBlogsFromLocalStorage();
    blogs = blogs.filter(blog => blog.title !== title);
    localStorage.setItem('blogs', JSON.stringify(blogs));
}
// script.js

const menuIcon = document.getElementById('menuIcon');
const navList = document.getElementById('navList');

menuIcon.addEventListener('click', () => {
    navList.classList.toggle('show');
});

// Additional JavaScript for blog functionality goes here...
