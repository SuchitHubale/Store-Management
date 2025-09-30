
export const validateRegistration = (req, res, next) => {
    const { name, email, contact, password } = req.body;
    const errors = [];
  
    if (!name || name.trim().length < 2) {
      errors.push("Name must be at least 2 characters long");
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.push("Valid email is required");
    }
  
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!contact || !phoneRegex.test(contact)) {
      errors.push("Valid contact number is required (10-15 digits)");
    }
  
    if (!password || password.length < 6) {
      errors.push("Password must be at least 6 characters long");
    }
  
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }
  
    req.body.name = name.trim();
    req.body.email = email.trim().toLowerCase();
    req.body.contact = contact.trim();
  
    next();
  };
  

  export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    const errors = [];
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.push("Valid email is required");
    }
  
    
    if (!password || password.length < 6) {
      errors.push("Password is required");
    }
  
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }
  
    req.body.email = email.trim().toLowerCase();
  
    next();
  };
  
  
  export const validateItem = (req, res, next) => {
    const { itemName, quantity, category } = req.body;
    const errors = [];
  
    if (!itemName || itemName.trim().length < 2) {
      errors.push("Item name must be at least 2 characters long");
    }
  
    if (!quantity || quantity < 1) {
      errors.push("Quantity must be at least 1");
    }
  
    if (!category || category.trim().length < 2) {
      errors.push("Category is required");
    }
  
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }
  
    req.body.itemName = itemName.trim();
    req.body.category = category.trim();
    if (req.body.description) {
      req.body.description = req.body.description.trim();
    }
  
    next();
  };