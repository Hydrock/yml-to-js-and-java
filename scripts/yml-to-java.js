const fs = require('fs');
const yaml = require('js-yaml');

function toJavaType(jsValue) {
    if (typeof jsValue === 'string') return `String ${jsValue}`;
    if (typeof jsValue === 'number') return `int ${jsValue}`;
    if (typeof jsValue === 'boolean') return `boolean ${jsValue}`;
    // Добавьте здесь другие типы при необходимости
    return `Object ${jsValue}`;
}

function createJavaClass(data, className) {
    let classContent = `public class ${className} {\n`;

    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            let value = data[key];
            classContent += `    public static final ${toJavaType(value)} ${key.toUpperCase()} = ${JSON.stringify(value)};\n`;
        }
    }

    classContent += `}\n`;
    return classContent;
}

try {
    const fileContents = fs.readFileSync('./src/constants.yml', 'utf8');
    const data = yaml.load(fileContents);

    fs.mkdirSync('./.dist/java/', { recursive: true }, (err) => {
        if (err) throw err;
    });

    const javaClassContent = createJavaClass(data, 'Config');
    fs.writeFileSync('./.dist/java/Constants.java', javaClassContent);

    console.log('Java класс успешно создан!');
} catch (e) {
    console.error(e);
}
