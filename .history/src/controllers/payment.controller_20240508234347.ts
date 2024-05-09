const getOrderUserController = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return res.status(returnData.status).json(returnData.data);
  };
  
  export { 

    getOrderUserController 
  }