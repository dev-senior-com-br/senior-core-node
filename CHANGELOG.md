# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.1.3] - 2021-02-17

## [2.1.2] - 2021-02-17

### Fixed

-   Correção na URL de produção

## [2.1.1] - 2021-02-03

### Fixed

-   Correção na documentaçao

## [2.1.0] - 2021-02-03

### Added

-   Guia de exemplos;
-   Adicionado parametro `notificationClass` ao fazer a chamada do metodo `Notification.notifyUser`.
-   Incluidas as primitivas `getCustomProperty`, `createCustomProperty`, `updateCustomProperty` e `deleteCustomProperty` do serviço `Configuration`

### Changed

-   Alterado chamadas para os métodos do `Authentication`, agora não é mais uma lista de parametros e sim um objeto;
-   Alterado chamadas para os métodos do `Authorization`, agora não é mais uma lista de parametros e sim um objeto;
-   Alterado chamadas para os métodos do `Notification`, agora não é mais uma lista de parametros e sim um objeto;
-   Alterado chamadas para os métodos do `Users`, agora não é mais uma lista de parametros e sim um objeto;
-   Ajustado os exemplos para atender os novos métodos.
-   Alterado os endpoints do `User.deleteGroup` e `User.deleteUser`. Agora passam a chamar o serviço de `user` (`user\actions\deleteUser` e `user\actions\removeGroup`).

## [2.0.0] - 2020-09-01

### Changed

-   Alterado chamadas para os métodos do `Authentication`, agora não é mais uma lista de parametros e sim um objeto;
-   Alterado chamadas para os métodos do `Authorization`, agora não é mais uma lista de parametros e sim um objeto;
-   Alterado chamadas para os métodos do `Notification`, agora não é mais uma lista de parametros e sim um objeto;
-   Alterado chamadas para os métodos do `Users`, agora não é mais uma lista de parametros e sim um objeto;
-   Ajustado os exemplos para atender os novos métodos.

### Added

-   Guia de exemplos;
-   Adicionado parametro `notificationClass` ao fazer a chamada do metodo `Notification.notifyUser`.

## [1.3.0] - 2020-08-17

### Added

-   Criado documentação de entidades
-   Tipado entidades e documentado filtros

## [1.2.33] - 2020-08-17

### Added

-   Configurado CI/CD utilizando Github Actions.

## [1.2.32] - 2020-08-16

### Changed

### Fixed

### Removed

### Added

[Unreleased]: https://github.com/dev-senior-com-br/senior-core-node/compare/2.1.3...HEAD

[2.1.3]: https://github.com/dev-senior-com-br/senior-core-node/compare/2.1.2...2.1.3

[2.1.2]: https://github.com/dev-senior-com-br/senior-core-node/compare/2.1.1...2.1.2

[2.1.1]: https://github.com/dev-senior-com-br/senior-core-node/compare/2.1.0...2.1.1

[2.1.0]: https://github.com/dev-senior-com-br/senior-core-node/compare/2.0.0...2.1.0

[2.0.0]: https://github.com/dev-senior-com-br/senior-core-node/compare/1.3.0...2.0.0

[1.3.0]: https://github.com/dev-senior-com-br/senior-core-node/compare/v1.2.33...1.3.0

[1.2.33]: https://github.com/dev-senior-com-br/senior-core-node/compare/v1.2.32...1.2.33

[1.2.32]: https://github.com/dev-senior-com-br/senior-core-node/releases/tag/v1.2.32
