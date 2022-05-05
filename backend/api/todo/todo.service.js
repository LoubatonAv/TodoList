const dbService = require('../../services/db.service');
const logger = require('../../services/logger.service');
const ObjectId = require('mongodb').ObjectId;

async function query(filterBy = { word: '', type: '' }) {
  try {
    const criteria = _buildCriteria(filterBy);
    const collection = await dbService.getCollection('todo');

    const todos = await collection.find(criteria).toArray();

    // console.log('query -> todos', todos);
    return todos;
  } catch (err) {
    logger.error('Can not find todos', err);
    throw err;
  }
}

async function remove(todoId) {
  console.log('todoId deleted successfully:', todoId);

  try {
    const collection = await dbService.getCollection('todo');

    await collection.deleteOne({ _id: ObjectId(todoId) });
    return todoId;
  } catch (err) {
    logger.error(`Can not remove toy ${todoId}`, err);
    throw err;
  }
}

async function getById(toyId) {
  try {
    const collection = await dbService.getCollection('toy');

    const toy = await collection.findOne({ _id: ObjectId(toyId) });

    if (!toy.reviews) {
      toy.reviews = _createReviews();
      await collection.updateOne({ _id: ObjectId(toyId) }, { $set: { ...toy } });
    }

    return toy;
  } catch (err) {
    logger.error(`Can not find toy ${toyId}`, err);
    throw err;
  }
}

async function add(todo) {
  console.log('todo:', todo);

  try {
    todo.createdAt = Date.now();
    todo.isDone = false;
    const collection = await dbService.getCollection('todo');
    await collection.insertOne(todo);

    return todo;
  } catch (err) {
    logger.error('Can not add todo', err);
    throw err;
  }
}

async function update(todo) {
  try {
    const newTodo = {
      ...todo,
      _id: ObjectId(todo._id),
    };

    const collection = await dbService.getCollection('todo');
    await collection.updateOne({ _id: newTodo._id }, { $set: newTodo });
    return todo;
  } catch (err) {
    logger.error(`Can not update toy ${todo._id}`, err);
    throw err;
  }
}

module.exports = {
  remove,
  query,
  getById,
  add,
  update,
};

function _createReviews() {
  return [
    {
      name: 'Muki Ben Puki',
      rate: 4,
      addedAt: '10/09/2020',
      txt: 'Wow, thats a great game! im gonna play it so much!!',
    },
    {
      name: 'Shuki Laka Boom',
      rate: 1,
      addedAt: '25/07/2020',
      txt: 'Worst game EVAHHHHHHH, cant stand it!',
    },
    {
      name: 'Nana Banani',
      rate: 5,
      addedAt: '13/01/2021',
      txt: 'Played it with my entire family and loved every minute!!! wow!!!!!!!!!!!!!!!!!!',
    },
  ];
}

function _buildCriteria(filterBy) {
  const criteria = {};
  const { word, labels } = filterBy;

  if (word) {
    const txtCriteria = { $regex: word, $options: 'i' };
    criteria.name = txtCriteria;
  }
  if (labels) {
    criteria.labels = { $all: labels };
  }
  if (filterBy.type) {
    criteria.inStock = { $eq: filterBy.type === 'instock' };
  }
  return criteria;
}
