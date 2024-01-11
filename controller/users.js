const { PrismaClient } = require("@prisma/client");
const supabaseClient = require("../middleware/supabase");
const createId = require("../utils/createId");
const prisma = new PrismaClient();

const getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    return res.json({
      message: "success",
      data: users,
    });
  } catch (error) {
    next();
  }
};

const getOneUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    return res.json({
      message: "success",
      data: user,
    });
  } catch (error) {
    next();
  }
};

const deleteOneUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return res.json({
      message: "success delete",
      data: user,
    });
  } catch (error) {
    next();
  }
};

const createOneUser = async (req, res, next) => {
  try {
    const { nama, no_ktp } = req.body;
    const file = req.file;
    const filename = `${createId(6)}.png`;

    const { data, error } = await supabaseClient.storage
      .from("usersProfile")
      .upload(`public/${filename}`, file.buffer, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.mimetype,
      });
    let publicUrlFilename;
    if (data) {
      const { data: profilUrl } = await supabaseClient.storage
        .from("usersProfile")
        .getPublicUrl(data.path);
      publicUrlFilename = profilUrl.publicUrl;
      //   console.log("profilUrl >>", profilUrl);
    }
    const user = await prisma.user.create({
      data: {
        nama,
        no_ktp,
        profil: data.path,
        profilURL: publicUrlFilename,
      },
    });
    return res.json({
      message: "success create user",
      data: user,
    });
  } catch (error) {
    console.log(error);
    next();
  }
};

const updateOneUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nama, no_ktp } = req.body;
    const getUser = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    console.log("user >> ", getUser)
    if (!getOneUser) {
      return res.json({
        message: "no user found",
      });
    }
    const file = req.file;
    if (file) {
      const filename = `${createId(6)}.png`;

      if (getUser.profil) {
        const { data, error } = await supabaseClient.storage
          .from("usersProfile")
          .remove([getUser.profil]);
      }

      const { data, error } = await supabaseClient.storage
        .from("usersProfile")
        .upload(`public/${filename}`, file.buffer, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.mimetype,
        });

      let publicUrlFilename;

      if (data) {
        const { data: profilUrl } = await supabaseClient.storage
          .from("usersProfile")
          .getPublicUrl(data.path);
        publicUrlFilename = profilUrl.publicUrl;
        //   console.log("profilUrl >>", profilUrl);
      }
      const user = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          nama: nama ? nama : getUser.nama,
          no_ktp: no_ktp ? no_ktp : getUser.no_ktp,
          profil: data ? data.path : "",
          profilURL: publicUrlFilename ? publicUrlFilename : "",
        },
      });
      return res.json({
        message: "success update user",
        data: user,
      });
    } else {
      const user = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          nama: nama ? nama : getUser.nama,
          no_ktp: no_ktp ? no_ktp : getUser.no_ktp,
        },
      });
      return res.json({
        message: "success update user",
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    next();
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  deleteOneUser,
  createOneUser,
  updateOneUser
};
