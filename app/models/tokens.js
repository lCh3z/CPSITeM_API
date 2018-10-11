class Token{
  static async add({
    token,
    created,
    id_user,
    expiter,
    type,
    status
  }) {
    try {
      await db.create(
        'tokens',
        {
          token,
          created,
          id_user,
          expiter,
          type,
          status
        }
      );
    } catch (e) {
      next(e);
    }
    next();
  }
}
