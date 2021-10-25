import express from 'express';

/**
 * Checks admin access for user
 * */
const admin = (req: express.Request, res: express.Response, next: () => void) => {

  /** break if test request **/
  if (req.method === 'OPTIONS')
    return next();

  try {
    if (req.user && req.user.admin) {
      next();
    } else {
      res.status(404).json({ message: 'admin access forbidden' });
    }
  } catch (e) {
    res.status(500).json({ message: 'something failed' });
  }

};

export default admin;