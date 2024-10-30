// jsharipovamir@gmail.com:
// re_YMWcQ5v1_3LdUaGdaiDmcSVhv2QG7PXG2

// mavjisabz@gmail.com:
// re_giQh3bsx_AZHp6RRZoB2nWjeLLXVHQNsm

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 4000;

// Настройка CORS
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://amirtjk.github.io",
    "https://mavjisabz.com",
  ], // Добавьте URL вашего клиентского приложения на GitHub Pages
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};

app.use(cors(corsOptions));

// Миддлвары
app.use(bodyParser.json());

// API_KEY для Resend
const API_KEY = "re_giQh3bsx_AZHp6RRZoB2nWjeLLXVHQNsm";
const RESEND_URL = "https://api.resend.com/emails";

app.post("/api/email", async (req, res) => {
  const { name, phone, age, email } = req.body;

  console.log("Received email request:", { name, phone, age, email });

  try {
    // Отправка запроса через Resend API
    const response = await axios.post(
      RESEND_URL,
      {
        from: "onboarding@resend.dev",
        to: "mavjisabz@gmail.com",
        subject: "Новая заявка на проект Мавчи Сабз",
        html: `
          <p>Поступила новая заявка от потенциального участника. Ниже приведены данные, предоставленные заявителем:</p>
          <p><strong>Имя:</strong> ${name}</p>
          <p><strong>Телефон:</strong> ${phone}</p>
          <p><strong>Возраст:</strong> ${age}</p>
          <p><strong>Email:</strong> ${email}</p>
        `,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Логирование ответа от Resend API
    console.log("Response from Resend API:", response.data);

    // Возвращаем ответ клиенту
    res.status(200).json({
      message: "Email sent successfully!",
      resendResponse: response.data, // Передаем данные от Resend API клиенту для отладки
    });
  } catch (error) {
    console.error(
      "Error sending email:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Error sending email" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
