CREATE DATABASE projeto_teste;

USE projeto_teste;
CREATE TABLE cargo (id INT NOT NULL auto_increment, nome VARCHAR(100) NOT NULL, PRIMARY KEY(id));

INSERT INTO cargo (nome) VALUES ('Analista de Requisitos');
INSERT INTO cargo (nome) VALUES ('Desenvolvedor Sênior');
INSERT INTO cargo (nome) VALUES ('Desenvolvedor Pleno');
INSERT INTO cargo (nome) VALUES ('Desenvolvedor Júnior');
INSERT INTO cargo (nome) VALUES ('DBA');
INSERT INTO cargo (nome) VALUES ('Tester');

CREATE TABLE colaborador (id INT NOT NULL auto_increment, nome VARCHAR(100) NOT NULL, salario FLOAT NOT NULL, primary key(id));
INSERT INTO colaborador (nome, salario) VALUES ('Alan Turing', 4180);
INSERT INTO colaborador (nome, salario) VALUES ('Edsger Dijkstra', 3657.5);
INSERT INTO colaborador (nome, salario) VALUES ('Katherine Johnson', 3657.5);
INSERT INTO colaborador (nome, salario) VALUES ('Mary Kenneth Keller', 5225);
INSERT INTO colaborador (nome, salario) VALUES ('Hedy Lamarr', 6792.5);
INSERT INTO colaborador (nome, salario) VALUES ('Ada Lovelace', 4702.5);
INSERT INTO colaborador (nome, salario) VALUES ('Linus Torvalds', 5225);
INSERT INTO colaborador (nome, salario) VALUES ('Niklaus Wirth', 3657.5);
INSERT INTO colaborador (nome, salario) VALUES ('Radia Perlman', 3657.5);
INSERT INTO colaborador (nome, salario) VALUES ('Grace Hopper', 4180);