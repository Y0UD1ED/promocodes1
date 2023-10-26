const express = require('express');
const fs = require('fs');
const app = express();

// Генерация случайного промокода
function generatePromoCode(length) 
{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) 
    {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Чтение промокодов из файла
function readPromoCodes() 
{
    try 
    {
        const promoCodesData = fs.readFileSync('promoCodes.txt', 'utf8');
        return JSON.parse(promoCodesData);
    } catch (err) 
    {
        console.error(err);
        return {};
    }
}

// Запись промокодов в файл
function writePromoCodes(promoCodes) 
{
    try 
    {
        fs.writeFileSync('../promoCodes.txt', JSON.stringify(promoCodes));
    } catch (err) 
    {
        console.error(err);
    }
}

// Хранение промокодов и их количество использований
var promoCodes = readPromoCodes();

// Создание нового промокода
app.get('/', (req, res) => 
{
    const promoCode = generatePromoCode(12);
    promoCodes[promoCode] = 0;
    writePromoCodes(promoCodes);
    res.send(promoCode);
});

// Проверка промокода
app.get('/promo/:code', (req, res) => 
{
    const promoCode = req.params.code;
    if (promoCode in promoCodes && promoCodes[promoCode] < 5) 
    {
        promoCodes[promoCode]++;
        writePromoCodes(promoCodes);
        res.send('Промокод принят');
    } else 
    {
        res.send('Промокод не действителен или уже использован максимальное количество раз');
    }
});
