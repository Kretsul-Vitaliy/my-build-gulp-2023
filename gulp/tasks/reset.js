import { deleteAsync } from 'del';

export const reset = async () => {
  let del = await deleteAsync(app.path.clean);
  return del;
};
