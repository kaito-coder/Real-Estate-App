import differenceBy from 'lodash/differenceBy.js';
async function seedingValue(model, data) {
  try {
    const existance = await model
      .find({
        name: { $in: data.map((element) => element.name) },
      })
      .exec();

    const missingValue = differenceBy(data, existance, 'name');
    await model.create(missingValue);
  } catch (error) {
    throw new Error(error);
  }
}

export default seedingValue;
