const authCheck = (req: any, res: any, next: any) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({ message: 'You are not authenticated!' });
  }
};

export { authCheck };
