const { response } = require("express");
const MaterialData = require("./MaterialData");
const GetNextNo = require('./GenerateNextNo');


let item;

exports.updateOrCreate = async (model, where, newItem) => {
  try {
    
    let foundItem = await model.findOne(where);
    foundItem = JSON.stringify(foundItem);
    foundItem = JSON.parse(foundItem);
    if (!foundItem) {
      item = await model.create(newItem);
      return { Data: item, success: true, created: true };
    }
    else {
      item = await model.update(newItem, where);
      return { Data: foundItem, success: true, created: false };
    }
  } catch (err) {
    console.log(err)
    return { Data: {}, success: false, created: false };
  }
};

exports.bulkCreate = async (model, data) => {
  try {
    item = await model.bulkCreate(data);
    return { Data:item, success: true };
  } catch (err) {
    return { Data: {}, success: false };
  }
};

exports.Delete = async (model, where) => {
  try {
    let foundItem = await model.findOne(where);
    foundItem = JSON.stringify(foundItem);
    foundItem = JSON.parse(foundItem);

    

    if (foundItem) {
      await model.destroy(where);
      return { Data: item, success: true };
    } else {
      return { Data: item, success: false };
    }
  } catch (err) {
    return { Data: {}, created: false };
  }
};

exports.getAll = async (model, where, mt, columns) => {
  try {
    let foundItem = await model.findAll(where, {attributes: columns });
    foundItem = JSON.stringify(foundItem);
    foundItem = JSON.parse(foundItem);
    if (mt) {
      
      let RegData = await MaterialData.Register(foundItem, columns);
      return { Data: RegData, success: true };
    } else {
      return { Data: foundItem, success: true };
    }
  } catch (err) {
    console.log(err)
    return { Data: [], success: false };
  }
};

exports.getOne = async (model, where) => {
  try {
    let foundItem = await model.findOne(where);
    foundItem = JSON.stringify(foundItem);
    foundItem = JSON.parse(foundItem);

    return { Data: foundItem ? foundItem : {}, success: foundItem ? true : false };
  } catch (err) {
    return { Data: {}, success: false };
  }
};

exports.Trans_updateOrCreate = async (db,model,model_NN, where, newItem,t) => {
  try {
    
    let foundItem = await model.findOne(where);
    foundItem = JSON.stringify(foundItem);
    foundItem = JSON.parse(foundItem);
    
    
    if (!foundItem) {
      let TransNo = await GetNextNo.NextNo(model_NN,newItem.TransType, t);
      newItem.TransNo = TransNo;
      item = await model.create(newItem,{transaction:t});
      return { Data: item, success: true, created: true };
    }
    else {
      item = await model.update(newItem, where);
      return { Data: foundItem, success: true, created: false };
    }
  } catch (err) {
    console.log(err)
    return { Data: {}, success: false, created: false };
  }
};

exports.Trans_bulkCreate = async (model, where, data, t) => {
  try {
    
    await model.destroy(where);
    
    item = await model.bulkCreate(data,{transaction:t});
    return { Data:item, success: true };

  } catch (err) {
    console.log(err)
    return { Data: {}, success: false };
  }
};
