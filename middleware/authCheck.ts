const authCheck = (req: any, res: any, next: any) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.send('You are not authenticated!!!');
  }
};

export { authCheck };
