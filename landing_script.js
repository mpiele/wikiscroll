$("#categoryForm").on("submit", function (e) {
    e.preventDefault();
  
    const selectedCategory = $("input[name='category']:checked").val();
  
    if (!selectedCategory) {
      return;
    }
  
    // Store selection as a cookie (you can also use localStorage if preferred)
    document.cookie = `category=${selectedCategory}; path=/;`;
  
    // Redirect to the article page
    window.location.href = "main.html";
  });
  