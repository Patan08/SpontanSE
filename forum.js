function goToForumDetail(forumTitle) {
    localStorage.setItem('forumTitle', forumTitle);
    window.location.href = 'forumdetail.html';
}

function goBackToForums() {
    window.location.href = 'forum.html';
}

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes('forum-detail.html')) {
        const forumTitle = localStorage.getItem('forumTitle');
        document.getElementById('forum-title').textContent = forumTitle;
        loadTopics();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes('forumdetail.html')) {
        const forumTitle = localStorage.getItem('forumTitle');
        document.getElementById('forum-title').textContent = forumTitle;
        loadTopics();
    }
});

function showAddTopicForm() {
    document.getElementById('add-topic-form').style.display = 'flex';
    document.getElementById('add-topic-form').style.flexDirection = 'column';
    document.getElementById('forum').style.display = 'none';
}

function addTopic() {
    const title = document.getElementById('new-topic-title').value;
    const author = document.getElementById('new-topic-author').value;
    const content = document.getElementById('new-topic-content').value;

    if (title && author && content) {
        // Membuat objek topik
        const newTopic = {
            title: title,
            author: author,
            content: content,
            comments: [] // Array untuk komentar, awalnya kosong
        };

        // Mengambil atau membuat penyimpanan lokal untuk topik-topik forum
        let topics = JSON.parse(localStorage.getItem('topics')) || {};

        // Menyimpan topik baru di dalam objek berdasarkan judul forum
        const forumTitle = localStorage.getItem('forumTitle');
        if (!topics[forumTitle]) {
            topics[forumTitle] = [];
        }
        topics[forumTitle].push(newTopic);

        // Menyimpan kembali ke penyimpanan lokal
        localStorage.setItem('topics', JSON.stringify(topics));

        // Menampilkan topik baru di halaman
        loadTopics();

        // Membersihkan formulir
        document.getElementById('new-topic-title').value = '';
        document.getElementById('new-topic-author').value = '';
        document.getElementById('new-topic-content').value = '';
        document.getElementById('add-topic-form').style.display = 'none';
        document.getElementById('forum').style.display = 'block';
    } else {
        alert('Please fill in all fields');
    }
}

function addComment(button) {
    const commentInput = button.previousElementSibling;
    const commentText = commentInput.value;

    if (commentText) {
        // Mendapatkan indeks topik dari elemen induk button
        const topicElement = button.closest('.topic');
        const topicIndex = Array.from(topicElement.parentNode.children).indexOf(topicElement);

        // Mendapatkan penyimpanan lokal topik-topik
        let topics = JSON.parse(localStorage.getItem('topics')) || {};
        const forumTitle = localStorage.getItem('forumTitle');
        const topicsForForum = topics[forumTitle] || [];

        // Menambahkan komentar ke topik yang tepat
        topicsForForum[topicIndex].comments.push({
            author: 'Anonymous',
            content: commentText
        });

        // Menyimpan kembali ke penyimpanan lokal
        topics[forumTitle] = topicsForForum;
        localStorage.setItem('topics', JSON.stringify(topics));

        // Menampilkan kembali topik dengan komentar baru
        loadTopics();

        // Membersihkan input komentar
        commentInput.value = '';
    } else {
        alert('Please enter a comment');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes('forumdetail.html')) {
        const forumTitle = localStorage.getItem('forumTitle');
        document.getElementById('forum-title').textContent = forumTitle;
        loadTopics();
    }
});

function loadTopics() {
    const topics = JSON.parse(localStorage.getItem('topics')) || {};
    const forumTitle = localStorage.getItem('forumTitle');
    const topicsForForum = topics[forumTitle] || [];

    const topicsContainer = document.getElementById('topics');
    topicsContainer.innerHTML = ''; // Membersihkan kontainer sebelum menambah topik

    topicsForForum.forEach(topic => {
        const newTopicElement = createTopicElement(topic);
        topicsContainer.appendChild(newTopicElement);
    });
}

function createTopicElement(topic) {
    const newTopic = document.createElement('div');
    newTopic.classList.add('topic');
    newTopic.innerHTML = `
        <h3>${topic.title}</h3>
        <p><strong>by: ${topic.author}</strong></p>
        <p>${topic.content}</p>
        <input type="text" placeholder="add comments ...">
        <button onclick="addComment(this)">Add Comment</button>
        <div class="comments">
            <!-- Comments will be dynamically added here -->
        </div>
    `;

    const commentsContainer = newTopic.querySelector('.comments');
    topic.comments.forEach(comment => {
        const newComment = document.createElement('div');
        newComment.classList.add('comment');
        newComment.innerHTML = `
            <p><strong>${comment.author}</strong></p>
            <p>${comment.content}</p>
        `;
        commentsContainer.appendChild(newComment);
    });

    return newTopic;
}
