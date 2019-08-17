import React from 'react';
import {
  Button, FormControlLabel, Checkbox, Typography,
} from '@material-ui/core';
import Box from './Box';
import BaseParagraph from './Paragraph';
import ColouredSpan from './ColouredSpan';

const tcle = 'https://concatto-ttc.s3-sa-east-1.amazonaws.com/tcle_meta.pdf';

function Emph(props) {
  return <ColouredSpan colour="secondary" {...props} />;
}

function Bold(props) {
  return <span style={{ fontWeight: 400 }} {...props} />;
}

function Paragraph({ children, n, ...rest }) {
  return (
    <BaseParagraph align="justify" {...rest}>
      {n && (
      <span style={{ marginRight: 12 }}>{n}.</span>
      )}
      {children}
    </BaseParagraph>
  );
}

function Consent() {
  const [detailed, setDetailed] = React.useState(false);

  return (
    <Box padding="2 0 0">
      <Box crossAlign="center">

        <FormControlLabel
          control={(
            <Checkbox
              checked={detailed}
              onChange={e => setDetailed(e.target.checked)}
            />
          )}
          label="Modo detalhado"
        />
      </Box>

      {detailed ? (
        <>
          <Box padding="2 0">
            <embed
              src={`https://drive.google.com/viewerng/viewer?embedded=true&url=${tcle}`}
              width="100%"
              height="600"
            />
          </Box>

          <Box crossAlign="center" padding="2 0 4">
            <Button color="secondary" variant="outlined" component="a" href={tcle} target="_blank">
              Baixar via
            </Button>
          </Box>
        </>
      ) : (
        <Box padding="2 0 4">
          <Box padding="0 0 4">
            <Typography variant="h5" align="center">
            Termo de Consentimento Livre e Esclarecido
            </Typography>
          </Box>
          <Paragraph n="1" align="justify">
            Será solicitado que você informe seu <Emph>nível de amizade</Emph> com seus colegas de classe, em uma escala de 0 a 5, e se a amizade aumentou, diminuiu ou permaneceu igual.
          </Paragraph>
          <Paragraph n="2">
            Para que seja possível efetuar as análises de correlação, você também precisará fornecer seu <Emph>Histórico Escolar</Emph>, acessível pela Intranet da UNIVALI.
          </Paragraph>
          <Paragraph n="3">
            Tais dados serão tratados de forma <Emph>totalmente confidencial</Emph>, e serão utilizados única e exclusivamente para atingir os objetivos do estudo. Suas informações de identificação pessoal (como seu nome) passarão por um processo de <Emph>anonimização</Emph> por <i>hashing</i>, tornando impossível revertê-las às suas formas originais.
          </Paragraph>
          <Paragraph n="4">
            Sua participação na pesquisa é voluntária e você pode encerrá-la a qualquer momento. Não haverá remuneração ou benefícios diretos a você por sua participação no estudo.
          </Paragraph>
          <Paragraph n="5">
            As informações que você fornecer serão utilizadas para expandir a compreensão do impacto de relacionamentos interpessoais no contexto educacional, servindo como fundamentação para auxiliar o desenvolvimento de metodologias de ensino que levam em conta a importância da influência social em sala de aula.
          </Paragraph>
          <Paragraph n="6">
            Este estudo faz parte do Trabalho Técnico-Científico de Conclusão do Curso de Ciência da Computação intitulado <Emph><q>Investigação Quanto ao Papel de Círculos Sociais no Desempenho Discente no Ensino Superior utilizando Análise de Redes Complexas</q></Emph>, desenvolvido por Fernando Concatto e orientado por Alex Luciano Roesler Rese. Sinta-se livre para entrar em contato conosco.
          </Paragraph>
          <BaseParagraph compact>
            <ColouredSpan colour="primary">
              <Bold>Fernando Concatto:</Bold> fernandoconcatto@gmail.com / (47) 98415-5043
            </ColouredSpan>
          </BaseParagraph>
          <BaseParagraph>
            <ColouredSpan colour="primary">
              <Bold>Alex Luciano Roesler Rese:</Bold> alexrese@univali.br / (47) 99601-9526
            </ColouredSpan>
          </BaseParagraph>
        </Box>
      )}
    </Box>
  );
}

export default Consent;
