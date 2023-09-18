import * as userModel from '../models/usersModel.js';
import * as characterModel from '../models/characterModel.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).send('Error retrieving users.');
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.params.userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found.');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Error retrieving user.');
  }
};

export const addUser = async (req, res) => {
  try {
    const user = await userModel.addUser(req.body.username);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).send('Cannot add user.');
  }
};

export const getCharacters = async (req, res) => {
  try {
    const characters = await characterModel.getAllCharacters();
    res.json(characters);
  } catch (err) {
    res.status(500).send('Error retrieving characters.');
  }
};

export const getCharactersByUserId = async (req, res) => {
  try {
    const characters = await characterModel.getCharactersByUserId(req.params.userId);
    res.json(characters);
  } catch (err) {
    res.status(500).send('Error retrieving characters.');
  }
};

export const addCharacter = async (req, res) => {
  try {
    const character = await characterModel.addCharacter(req.body);
    res.status(201).json(character);
  } catch (err) {
    res.status(500).send('Cannot add character.');
  }
};
