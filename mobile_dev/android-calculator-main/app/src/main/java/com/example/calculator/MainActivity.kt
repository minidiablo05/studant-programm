package com.example.calculator // Замените на ваш package name

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontStyle.Companion.Italic
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.calculator.ui.theme.CalculatorTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            CalculatorTheme {
                // Surface обертка для правильной темы
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    CalculatorScreen()
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CalculatorScreen() {
    // Состояния калькулятора
    var display by remember { mutableStateOf("0") }
    var firstNumber by remember { mutableStateOf("") }
    var operation by remember { mutableStateOf("") }
    var clearDisplay by remember { mutableStateOf(false) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        text = "Калькулятор",
                        fontSize = 20.sp,
                        fontStyle = Italic,
                        fontWeight = FontWeight.Bold
                    )
                }
            )
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .padding(innerPadding)
                .padding(16.dp)
                .fillMaxSize()
        ) {
            // Дисплей калькулятора
            Text(
                text = display,
                fontSize = 25.sp,
                fontWeight = FontWeight.Medium
            )

            Spacer(modifier = Modifier.height(8.dp))
            // Клавиатура калькулятора
            CalculatorKeyboard(
                onDigitClick = { digit ->
                    display = when {
                        display == "0" || clearDisplay -> digit
                        else -> display + digit
                    }
                    clearDisplay = false
                },
                onOperationClick = { op ->
                    if (firstNumber.isEmpty()) {
                        firstNumber = display
                        operation = op
                        clearDisplay = true
                    }
                },
                onEqualsClick = {
                    if (firstNumber.isNotEmpty() && operation.isNotEmpty()) {
                        val first = firstNumber.toDoubleOrNull() ?: 0.0
                        val second = display.toDoubleOrNull() ?: 0.0

                        display = when (operation) {
                            "+" -> (first + second).toString()
                            "-" -> (first - second).toString()
                            "*" -> (first * second).toString()
                            "/" -> {
                                if (second != 0.0) {
                                    (first / second).toString()
                                } else {
                                    "Ошибка"
                                }
                            }
                            "%" -> ((first * second)/100).toString()
                            else -> display
                        }

                        firstNumber = ""
                        operation = ""
                        clearDisplay = true
                    }
                },
                onClearClick = {
                    display = "0"
                    firstNumber = ""
                    operation = ""
                    clearDisplay = false
                },
                onDotClick = {
                    if (!display.contains(".")) {
                        display += "."
                    }
                }
            )
        }
    }
}

@Composable
fun CalculatorKeyboard(
    onDigitClick: (String) -> Unit,
    onOperationClick: (String) -> Unit,
    onEqualsClick: () -> Unit,
    onClearClick: () -> Unit,
    onDotClick: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxWidth(),
            //.weight(4f),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        // Первая строка: C и /
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .weight(1f),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            // Кнопка очистки (C)
            Button(
                onClick = onClearClick,
                modifier = Modifier
                    .weight(1f)
                    .fillMaxSize(),
                shape = RoundedCornerShape(12.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = MaterialTheme.colorScheme.error
                )
            ) {
                Text(
                    text = "C",
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Bold
                )
            }

            // Кнопка деления (/)
            Button(
                onClick = { onOperationClick("/") },
                modifier = Modifier
                    .weight(1f)
                    .fillMaxSize(),
                shape = RoundedCornerShape(12.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = MaterialTheme.colorScheme.secondary
                )
            ) {
                Text(
                    text = "/",
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Bold
                )
            }
        }

        // Вторая строка: 7 8 9 *
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .weight(1f),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Column() {
                CreateDigitButton("7", onDigitClick)
            }
            Column() {
                CreateDigitButton("8", onDigitClick)
            }
            Column() {
                CreateDigitButton("9", onDigitClick)
            }
            // Кнопка умножения (*)
            Button(
                onClick = { onOperationClick("*") },
                modifier = Modifier
                    .weight(1f)
                    .fillMaxSize(),
                shape = RoundedCornerShape(12.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = MaterialTheme.colorScheme.secondary
                )
            ) {
                Text(
                    text = "×",
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Bold
                )
            }
        }

        // Третья строка: 4 5 6 -
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .weight(1f),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            CreateDigitButton("4", onDigitClick)
            CreateDigitButton("5", onDigitClick)
            CreateDigitButton("6", onDigitClick)

            // Кнопка вычитания (-)
            Button(
                onClick = { onOperationClick("-") },
                modifier = Modifier
                    .weight(1f)
                    .fillMaxSize(),
                shape = RoundedCornerShape(12.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = MaterialTheme.colorScheme.secondary
                )
            ) {
                Text(
                    text = "-",
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Bold
                )
            }
        }

        // Четвертая строка: 1 2 3 +
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .weight(1f),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            CreateDigitButton("1", onDigitClick)
            CreateDigitButton("2", onDigitClick)
            CreateDigitButton("3", onDigitClick)

            // Кнопка сложения (+)
            Button(
                onClick = { onOperationClick("+") },
                modifier = Modifier
                    .weight(1f)
                    .fillMaxSize(),
                shape = RoundedCornerShape(12.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = MaterialTheme.colorScheme.secondary
                )
            ) {
                Text(
                    text = "+",
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Bold
                )
            }
        }

        // Пятая строка: 0 . =
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .weight(1f),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Button(
                onClick = { onDigitClick("0") },
                modifier = Modifier
                    .weight(1f)
                    .fillMaxSize(),
                shape = RoundedCornerShape(12.dp)
            ) {
                Text(
                    text = "0",
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Bold
                )
            }

            // Кнопка точки (.)
            Button(
                onClick = onDotClick,
                modifier = Modifier
                    .weight(1f)
                    .fillMaxSize(),
                shape = RoundedCornerShape(12.dp)
            ) {
                Text(
                    text = ".",
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Bold
                )
            }

            // Кнопка равно (=)
            Button(
                onClick = onEqualsClick,
                modifier = Modifier
                    .weight(1f)
                    .fillMaxSize(),
                shape = RoundedCornerShape(12.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = MaterialTheme.colorScheme.primary
                )
            ) {
                Text(
                    text = "=",
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Bold
                )
            }
        }

        // Третья строка: 4 5 6 -
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .weight(1f),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            // Кнопка вычитания (%)
            Button(
                onClick = { onOperationClick("%") },
                modifier = Modifier
                    .weight(1f)
                    .fillMaxSize(),
                shape = RoundedCornerShape(12.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = MaterialTheme.colorScheme.secondary
                )
            ) {
                Text(
                    text = "%",
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Bold
                )
            }
        }
    }
}

// Вспомогательная функция для создания кнопок с цифрами

@Composable
fun CreateDigitButton(digit: String, onClick: (String) -> Unit) {
    Button(
        onClick = { onClick(digit) },
        modifier = Modifier
            .width(100.dp)
            .fillMaxSize(),
        shape = RoundedCornerShape(12.dp)
    ) {
        Text(
            text = digit,
            fontSize = 24.sp,
            fontWeight = FontWeight.Bold
        )
    }
}

@Preview
@Composable
fun Test() {
    CreateDigitButton(
        "9",
        onClick = TODO(),
    )
}

