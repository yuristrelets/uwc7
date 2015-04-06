# UWC Gitter Bot
[![Join the chat at https://gitter.im/yuristrelets/uwc7](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/yuristrelets/uwc7?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Решение для UA Web Challenge VII

> author Yuri Strelets<br/>
> email `yuristrelets@gmail.com`<br/>
> skype `yuristrelets`


## Установка
```
npm i
```


## Запуск
```
node index.js [room] [token]
```


## Зависимости

 * [node-gitter](https://www.npmjs.com/package/node-gitter)
 * [mathjs](http://mathjs.org/)


## Использование

В проекте используются понятия `бот` и `парсер`. Бот это по сути "оболочка" для парсеров.

Таким способом реализовываются модульность и расширяемость, можно создавать ботов с различным набором возможностей и комманд. 


## Бот

Бот тянет зависимостью `node-gitter` для взаимодействия с Gitter API, умеет подключаться к комнате (или нескольким комнатам), 
получать входящие сообщения и рассылать их парсерам. Также бот предоставляет методы для добавления/удаления парсеров. 

При подключении к комнате, бот выводит приветствие и список доступных комманд.

Использование:
```
new GitterBot('token')  // create bot instance
  .setName('Bot Name')  // set bot name
  .addParser(...)       // add parser
  .addParser(...)       // add parser
  .listenRoom('room1')  // start listen room1
  .listenRoom('room2'); // start listen room2
```


## Парсер

Парсер должен реализовывать два обязательных метода:
 * `execute(room, message)` вызывается при получении нового сообщения, принимает объект комнаты и объект сообщения
 * `help()` должен вернуть подсказку по использованию парсера, вызывается при подключении бота к комнате

Использование:
```
parser = new HelloParser();
mySuperBot
  .addParser(parser)
  ...
  .removeParser(parser);
```

В комплекте идут 3 парсера.

**Calc Parser**

Основной парсер, описанный в задании.
Использует комманду `calc {expression}` и возвращает вычисленный результат.
Используется библиотека `mathjs`, поэтому выражения, помимо обязательных `(), *, /, +, -` 
могут содержать все [доступные](http://mathjs.org/docs/index.html) операции в библиотеке.

**Hello Parser**

Использует комманду `hello` и выводит приветствие с именем пользователя, отправившего сообщение.

**Exchange Rate Parser**

Использует комманду `exchange [USD|EUR|RUR]` и выводит текущий курс валют приватбанка.
Курсы загружаются при создании парсера и в дальнейшем не обновляются. В реальном приложении желательно добавить
обновление данных и кеширование (на небольшой промежуток времени).


## Планы на будущее

Перейти к событийной модели и рассылать всем добавленным парсерам определенные события, а не вызывать их в цикле.
Это позволит достичь еще большей гибкости и расширяемости. 