# UWC Gitter Bot
[![Join the chat at https://gitter.im/yuristrelets/uwc7](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/yuristrelets/uwc7?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

> Решение для UA Web Challenge VII<br/><br/>
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
Можно запустить без параметров, будет использоваться комната `yuristrelets/uwc7` и мой токен.


## Бот

В проекте используются `бот` и `парсер`.

Бот использует [node-gitter]() для взаимодействия с Gitter API, умеет подключаться к комнате (нескольким комнатам)
и получать входящие сообщения. Больше бот ничего не умеет, но предоставляет интерфейс для добавления парсеров,
которые могут обрабатывать входящие сообщения.

При подключении к комнате, бот выводит приветствие и список доступных комманд.

Использование:
```
new GitterBot('token')  // create bot instance
  .setName('Bot Name')  // set bot name
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
bot.addParser(parser).removeParser(parser);
```

В проекте реализованы 3 парсера.

**Calc Parser**

Основной парсер, обозначенный в задании.
Реагирует на комманду `calc {expression}` и возвращает вычисленный результат.
Используется библиотека [mathjs](), поэтому выражения могут содержать все [доступные]() операции.

**Hello Parser**

Реагирует на комманду `hello` и выводит приветствие с именем пользователя.

**Exchange Rate Parser**

Реагирует на комманду `exchange [USD|EUR|RUR]` и выводит текущий курс валют по Приватбанку.
Курсы загружаются при создании парсера и в дальнейшем не обновляются. В реальном приложении желательно добавить
кеширование (на небольшой промежуток времени) и обновление данных.