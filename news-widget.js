(function () {
  const container = document.getElementById('news-widget');
  if (!container) return;

  const lang = container.getAttribute('data-lang') || 'en';
  const autoRefresh = container.getAttribute('data-refresh') === 'true';
  let currentCategory = 'web3';

  const render = (data) => {
    container.innerHTML = ''; // Clear existing content

    const wrapper = document.createElement('div');
    wrapper.style.border = '1px solid #ccc';
    wrapper.style.padding = '10px';
    wrapper.style.fontFamily = 'Arial, sans-serif';

    // Category Buttons
    const categories = Object.keys(data[lang]);
    const btnGroup = document.createElement('div');
    btnGroup.style.marginBottom = '10px';

    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.textContent = cat.toUpperCase();
      btn.style.marginRight = '5px';
      btn.style.cursor = 'pointer';
      btn.style.padding = '5px 10px';
      btn.style.border = '1px solid #007BFF';
      btn.style.background = cat === currentCategory ? '#007BFF' : '#fff';
      btn.style.color = cat === currentCategory ? '#fff' : '#007BFF';
      btn.onclick = () => {
        currentCategory = cat;
        render(data);
      };
      btnGroup.appendChild(btn);
    });

    wrapper.appendChild(btnGroup);

    // Articles
    const articles = data[lang][currentCategory] || [];
    articles.forEach(article => {
      const articleDiv = document.createElement('div');
      articleDiv.style.marginBottom = '10px';

      const title = document.createElement('a');
      title.href = article.url;
      title.textContent = article.title;
      title.style.fontWeight = 'bold';
      title.style.textDecoration = 'none';
      title.style.color = '#007BFF';

      const summary = document.createElement('p');
      summary.textContent = article.summary;
      summary.style.margin = '5px 0';

      articleDiv.appendChild(title);
      articleDiv.appendChild(summary);
      wrapper.appendChild(articleDiv);
    });

    container.appendChild(wrapper);
  };

  const fetchNews = () => {
    fetch('news.json') // Replace with your actual hosted URL
      .then(response => response.json())
      .then(data => render(data))
      .catch(error => {
        container.innerHTML = '<p>Failed to load news.</p>';
        console.error('Error loading news:', error);
      });
  };

  fetchNews();
  if (autoRefresh) setInterval(fetchNews, 60000); // Refresh every 60s
})();
