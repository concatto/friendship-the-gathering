import lodash from 'lodash';
import stringSimilarity from 'string-similarity';
import randomString from 'randomstring';
import names from './nomes_redux.json';

export const traverse = (item, leafMapper) => {
  if (lodash.isObjectLike(item) === false) {
    return leafMapper(item);
  }

  return lodash.mapValues(item, value => traverse(value, leafMapper));
};

export const removeImmutably = (arr, i) => [...arr.slice(0, i), ...arr.slice(i + 1)];

export const getToken = (props) => {
  const { match } = props;

  if (match === undefined) {
    return '';
  }

  const { token = '' } = match.params;

  return token;
};

export const getGender = (name) => {
  const upperName = name.split(' ')[0].toUpperCase();
  let maxSimilarity = 0;
  let bestMatch = names[0];

  for (let i = 0; i < names.length; i += 1) {
    const row = names[i];
    const similarity = stringSimilarity.compareTwoStrings(upperName, row.group_name);

    if (similarity > maxSimilarity) {
      maxSimilarity = similarity;
      bestMatch = row;
    }

    if (similarity === 1) {
      break;
    }
  }

  console.log('Match for ', upperName, ' => ', bestMatch, 'with s = ', maxSimilarity);
  return bestMatch.classification;
};

export const anonymize = name => (
  name.split(' ')
    .map(piece => randomString.generate(piece.length))
    .join(' ')
);

export const composeEmail = (memberData, groupName) => ({
  subject: `Experimento: ${groupName}`,
  to: memberData.email,
  content: `
Olá ${memberData.name}! Aqui é o Fernando.

Gostaria de te convidar para participar de um experimento que servirá para validar o instrumento de pesquisa referente ao meu TTC, intitulado "Investigação Quantitativa Quanto ao Papel de Círculos Sociais no Desempenho Discente no Ensino Superior", que está sendo orientado pelo Alex Rese. Nele, você responderá algumas perguntas que habilitarão a modelagem dos círculos sociais do grupo ${groupName} como uma Rede Complexa, permitindo análises mais profundas.

A natureza das perguntas é bastante sensível, portanto tomamos alguns cuidados para tratar dos dados. Após a conclusão do experimento, informações que identificariam você e seus colegas serão eliminadas da base de dados, sendo convertidas para códigos alfanuméricos.

Aqui está o link para responder o instrumento de pesquisa. Ele é único para você, então cuide bem dele.
http://lia-relay.ddns.net:3001/welcome/${memberData.token}

Obrigado pela atenção!`,
});
