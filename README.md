# UWC Gitter Bot
[![Join the chat at https://gitter.im/yuristrelets/uwc7](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/yuristrelets/uwc7?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

> Решение для UA Web Challenge VII

## Установка
```
npm i
```

## Запуск
```
node index.js [room] [token]
```
Можно запустить без параметров, тогда будет использоваться комната `yuristrelets/uwc7` и мой токен.

## Бот

Проект состоит из 2 частей: `бота` и `парсеров`.

Бот использует [node-gitter](), умеет слушать комнату или несколько комнат, а также входящие сообщения.
Больше бот ничего не умеет, но предоставляет интерфейс для добавления парсеров, которые смогут обрабатывать сообщения и реагировать на них.

При подключении к комнате бот выводит приветствие и список доступных комманд.

**Использование**
```
new GitterBot(token)
  .setName('Bot Name')  // set bot name
  .addParser( ... )     // add parser
  .listenRoom(roomId);  // start listen room
```


## Парсер

Особых ограничений к боту нет, но он должен реализовывать два обязательных метода:
 * `execute(room, message)` вызывается для обработки сообщения, принимает объект комнаты и объект сообщения
 * `help()` должен вернуть подсказку по использованию парсера