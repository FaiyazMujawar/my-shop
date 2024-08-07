export const toServiceResponse = (service: any) => {
  return {
    id: service.id,
    title: service.title,
    description: service.description,
    price: service.price,
    type: service.type,
    questions: service.questions,
  };
};
