export const validateRequest = (validator) => {
  return (req, res, next) => {
    const valid = validator(req.body);
    if (!valid) {
      return res.status(400).json({
        success: false,
        errors: validator.errors.map((err) => err.message),
      });
    }
    next();
  };
};
