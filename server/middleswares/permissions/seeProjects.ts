import User from '../../models/User';
import { getRepository } from 'typeorm';
import Project from '../../models/Project';

export const seeProjectWithNoPermissions = async () => {
  const projectRepository = getRepository(Project);

  return await projectRepository.find({
    where: {
      publicStatus: true,
    },
  });
};

export const seeProjectWithPermission = async (user: User) => {
  const projectRepository = getRepository(Project);

  return await projectRepository.find({
    where: {
      id: user.id,
    },
  });
};
