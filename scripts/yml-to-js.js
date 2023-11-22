const fs = require('fs');
const yaml = require('js-yaml');

try {
    // Загрузка YAML-файла
    const fileContents = fs.readFileSync('./src/constants.yml', 'utf8');
    const data = yaml.load(fileContents);

    fs.mkdirSync('./.dist/javascript/', { recursive: true }, (err) => {
        if (err) throw err;
    });

    // Генерация JS модуля
    const jsContent = `module.exports = ${JSON.stringify(data, null, 2)};`;
    fs.writeFileSync('./.dist/javascript/constants.js', jsContent);

    console.log('JavaScript-модуль успешно создан!');
} catch (e) {
    console.error(e);
}
