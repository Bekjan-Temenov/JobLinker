import axios from "axios";
import fs from "fs";

export async function generateCoverLetter(vacancyText) {
  const resumeText = fs.readFileSync("../config/resume.txt", "utf-8");

  const prompt = `
Ты карьерный помощник.
Вот описание вакансии:
"""${vacancyText}"""

Вот резюме кандидата:
"""${resumeText}"""

Сгенерируй сопроводительное письмо на русском языке, подходящее под вакансию.
Стиль — дружелюбный, профессиональный, без излишеств. Добавь упоминание нужных навыков.
`;

  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "deepseek-r1",
      prompt,
      stream: false,
    });

    const letter = response.data.response.trim();
    return letter;
  } catch (error) {
    console.error("Ошибка генерации письма:", error.message);
    return null;
  }
}
