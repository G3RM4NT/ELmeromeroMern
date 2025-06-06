const faqsController = {};
import faqsModel from "../models/faqs.js";

// Función auxiliar para validar datos con más reglas
const validateFaqData = ({ question, answer, level, isActive }) => {
  const errors = [];

  // Expresión regular para permitir solo letras, números, espacios y algunos signos básicos
  const validStringPattern = /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ,.?¡!¿\-_\s]+$/;

  // Validaciones para 'question'
  if (!question || typeof question !== "string" || question.trim().length === 0) {
    errors.push("El campo 'question' es obligatorio y debe ser una cadena no vacía.");
  } else {
    const trimmedQuestion = question.trim();
    if (trimmedQuestion.length < 10) {
      errors.push("El campo 'question' debe tener al menos 10 caracteres.");
    }
    if (trimmedQuestion.length > 200) {
      errors.push("El campo 'question' no debe exceder los 200 caracteres.");
    }
    if (!validStringPattern.test(trimmedQuestion)) {
      errors.push("El campo 'question' contiene caracteres no permitidos.");
    }
  }

  // Validaciones para 'answer'
  if (!answer || typeof answer !== "string" || answer.trim().length === 0) {
    errors.push("El campo 'answer' es obligatorio y debe ser una cadena no vacía.");
  } else {
    const trimmedAnswer = answer.trim();
    if (trimmedAnswer.length < 20) {
      errors.push("El campo 'answer' debe tener al menos 20 caracteres.");
    }
    if (trimmedAnswer.length > 1000) {
      errors.push("El campo 'answer' no debe exceder los 1000 caracteres.");
    }
    if (!validStringPattern.test(trimmedAnswer)) {
      errors.push("El campo 'answer' contiene caracteres no permitidos.");
    }
  }

  // Validaciones para 'level'
  if (!level || typeof level !== "string" || level.trim().length === 0) {
    errors.push("El campo 'level' es obligatorio y debe ser una cadena no vacía.");
  } else {
    const trimmedLevel = level.trim();
    if (trimmedLevel.length < 3) {
      errors.push("El campo 'level' debe tener al menos 3 caracteres.");
    }
    if (trimmedLevel.length > 50) {
      errors.push("El campo 'level' no debe exceder los 50 caracteres.");
    }
    if (!validStringPattern.test(trimmedLevel)) {
      errors.push("El campo 'level' contiene caracteres no permitidos.");
    }
  }

  // Validación para 'isActive'
  if (typeof isActive !== "boolean" && typeof isActive !== "undefined") {
    errors.push("El campo 'isActive' debe ser un booleano.");
  }

  return errors;
};

// SELECT - Obtener todas las FAQs
faqsController.getAllFaqs = async (req, res) => {
  try {
    const faqs = await faqsModel.find();
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las FAQs", error });
  }
};

// INSERT - Crear una nueva FAQ
faqsController.createFaq = async (req, res) => {
  try {
    const { question, answer, level, isActive } = req.body;

    // Validar datos
    const errors = validateFaqData({ question, answer, level, isActive });
    if (errors.length > 0) {
      return res.status(400).json({ message: "Errores de validación", errors });
    }

    const newFaq = new faqsModel({ question, answer, level, isActive });
    await newFaq.save();
    res.json({ message: "FAQ guardada" });
  } catch (error) {
    res.status(500).json({ message: "Error al guardar la FAQ", error });
  }
};

// DELETE - Eliminar una FAQ por ID
faqsController.deleteFaq = async (req, res) => {
  try {
    const deletedFaq = await faqsModel.findByIdAndDelete(req.params.id);
    if (!deletedFaq) {
      return res.status(404).json({ message: "FAQ no encontrada" });
    }
    res.json({ message: "FAQ eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la FAQ", error });
  }
};

// UPDATE - Actualizar una FAQ por ID
faqsController.updateFaq = async (req, res) => {
  try {
    const { question, answer, level, isActive } = req.body;

    // Validar datos
    const errors = validateFaqData({ question, answer, level, isActive });
    if (errors.length > 0) {
      return res.status(400).json({ message: "Errores de validación", errors });
    }

    const updatedFaq = await faqsModel.findByIdAndUpdate(
      req.params.id,
      { question, answer, level, isActive },
      { new: true }
    );

    if (!updatedFaq) {
      return res.status(404).json({ message: "FAQ no encontrada para actualizar" });
    }
    res.json({ message: "FAQ actualizada" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la FAQ", error });
  }
};

export default faqsController;
