import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import { User } from "../entities/userEntity";
const bcrypt = require("bcrypt");
// Crud Via Entity Manager Controller

// const userController = {
//   getAllUsers: async (req: Request, res: Response) => {
//     try {
//       const EntityManager = getManager();
//       const userss = await EntityManager.find(User, {
//         select: ["id", "name", "email"],
//       });
//       console.log(userss);
//       if (userss.length === 0) {
//         return res.status(404).send({
//           status: 404,
//           message: "No users found",
//           data: userss,
//         });
//       } else {
//         return res.send({
//           status: 200,
//           data: userss,
//         });
//       }
//     } catch (error) {
//       res.send({
//         status: 500,
//         message: "Internal Server Error",
//       });
//     }
//   },
//   createUser: async (req: Request, res: Response) => {
//     try {
//       const { name, email, password, confirmPassword, isAdmin } = req.body;
//       if (!name || !email || !password || !confirmPassword || !isAdmin) {
//         return res.status(400).send({
//           status: 400,
//           message: "Please enter all fields",
//         });
//       }
//       if (password !== confirmPassword) {
//         return res.status(400).send({
//           status: 400,
//           message: "Passwords do not match",
//         });
//       }
//       const EntityManager = getManager();
//       let userfind = await EntityManager.findOne(User, {
//         where: {
//           email: email,
//         },
//       });
//       if (userfind) {
//         return res.status(400).send({
//           status: 400,
//           message: "User already exists",
//         });
//       }
//       const passwordHash = await bcrypt.hash(password, 12);
//       const user = new User();
//       user.name = name;
//       user.email = email;
//       user.password = passwordHash;
//       user.isAdmin = isAdmin;
//       const newUser = await EntityManager.save(user);
//       res.send({
//         status: 200,
//         data: {
//           name: newUser.name,
//           email: newUser.email,
//           id: newUser.id,
//         },
//       });
//     } catch (error) {
//       console.log(error);
//       res.send({
//         status: 400,
//         data: error,
//       });
//     }
//   },
//   getUser: async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const userId = parseInt(id);
//     const EntityManager = getManager();
//     const user = await EntityManager.findOneBy(User, { id: userId });
//     if (!user) {
//       return res.status(400).send({
//         status: 400,
//         message: "User does not exist",
//       });
//     }
//     res.send({
//       status: 200,
//       data: user,
//     });
//   },
//   updateUser: async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const userId = parseInt(id);
//     const EntityManager = getManager();
//     const user = await EntityManager.findOneBy(User, { id: userId });
//     if (!user) {
//       return res.status(400).send({
//         status: 400,
//         message: "User does not exist",
//       });
//     } else {
//       const newUser = await EntityManager.update(User, userId, req.body);
//       console.log(newUser);
//       res.send({
//         status: 200,
//         message: "User updated successfully",
//       });
//     }
//   },
//   deleteUser: async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const userId = parseInt(id);
//     const EntityManager = getManager();
//     const user = await EntityManager.findOneBy(User, { id: userId });
//     if (!user) {
//       return res.status(400).send({
//         status: 400,
//         message: "User does not exist",
//       });
//     }
//     const newUser = await EntityManager.delete(User, userId);
//     res.send({
//       status: 200,
//       message: "User deleted successfully",
//     });
//   },
// };

const userController = {
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const repository = getRepository(User);
      const users = await repository.find();

      if (users.length === 0) {
        return res.status(404).send({
          status: 404,
          message: "No users found",
          data: users,
        });
      } else {
        return res.send({ status: 200, message: "success", data: users });
      }
    } catch (error) {
      res.send({
        status: 500,
        message: "Internal Server Error",
      });
    }
  },
  createUser: async (req: Request, res: Response) => {
    try {
      const { name, email, password, confirmPassword, isAdmin } = req.body;
      if (!name || !email || !password || !confirmPassword || !isAdmin) {
        return res.status(400).send({
          status: 400,
          message: "Please enter all fields",
        });
      }
      if (password !== confirmPassword) {
        return res.status(400).send({
          status: 400,
          message: "Passwords do not match",
        });
      }

      const repository = getRepository(User);
      let userfind = await repository.findOneBy({
        email: email,
      });

      if (userfind) {
        return res.status(400).send({
          status: 400,
          message: "User already exists",
        });
      }

      const passwordHash = await bcrypt.hash(password, 12);
      const user = new User();
      user.name = name;
      user.email = email;
      user.password = passwordHash;
      user.isAdmin = isAdmin;
      const newUser = repository.save(req.body);

      res.send({
        status: 200,
        data: newUser,
      });
    } catch (error) {
      res.send({
        status: 500,
        message: "Internal Server Error",
      });
    }
  },

  getUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const repository = getRepository(User);
      const user = await repository.findOneById(parseInt(id));

      if (!user) {
        return res.status(400).send({
          status: 400,
          message: "User does not exist",
        });
      } else {
        return res.send({ status: 200, message: "success", data: user });
      }
    } catch (error) {
      res.send({
        status: 500,
        message: "Internal Server Error",
      });
    }
  },

  updateUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const repository = getRepository(User);
      const user = await repository.findOneById(parseInt(id));

      if (!user) {
        return res.status(400).send({
          status: 400,
          message: "User does not exist",
        });
      } else {
        const newUser = await repository.update(parseInt(id), req.body);
        res.send({
          status: 200,
          message: "User updated successfully",
        });
      }
    } catch (error) {
      res.send({
        status: 500,
        message: "Internal Server Error",
      });
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const repository = getRepository(User);
      const user = await repository.findOneById(parseInt(id));

      if (!user) {
        return res.status(400).send({
          status: 400,
          message: "User does not exist",
        });
      } else {
        const newUser = await repository.delete(parseInt(id));
        return res.send({
          status: 200,
          message: "User deleted successfully",
        });
      }
    } catch (error) {
      res.send({
        status: 500,
        message: "Internal Server Error",
      });
    }
  },
};
export { userController };
