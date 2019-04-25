import React, { Component } from 'react';
import { Typography, Button } from '@material-ui/core';
import Box from './Box';

class ResearchInfo extends Component {
  render() {
    const { history } = this.props;

    return (
      <Box padding="0 8 0">
        <Typography variant="h4" gutterBottom color="primary">
          Investigação Quantitativa Quanto ao Papel de Círculos Sociais no Desempenho Discente no Ensino Superior
        </Typography>
        <Box padding="4 0">

          <Typography style={{ fontSize: 20, fontWeight: 300 }} gutterBottom>
            <span style={{ fontWeight: 400 }}>Acadêmico</span>: Fernando Concatto (fernandoconcatto@gmail.com)
          </Typography>
          <Typography style={{ fontSize: 20, fontWeight: 300 }} gutterBottom>
            <span style={{ fontWeight: 400 }}>Orientador</span>: Alex Luciano Roesler Rese (alex@univali.br)
          </Typography>
          <Typography style={{ fontSize: 20, fontWeight: 300 }} gutterBottom>
            <span style={{ fontWeight: 400 }}>Área de Estudo</span>: Ciência da Computação, com enfoque em Análise de Redes Complexas
          </Typography>
        </Box>
        <Typography style={{ fontSize: 20, fontWeight: 300 }} gutterBottom>
          Resumo:
        </Typography>
        <Typography align="justify">
          O comportamento individual dos seres humanos é suscetível a influências advindas de seus contatos mais próximos. Sabe-se que o contato entre indivíduos, tanto direto quanto indireto, pode fomentar ou amenizar uma considerável diversidade de características e comportamentos humanos, como desenvolvimento de obesidade, dependência de álcool e drogas, opiniões positivas quanto a produtos e estados emocionais negativos. Este trabalho busca avaliar, de forma quantitativa, o impacto do contexto social de estudantes de graduação sobre seu desempenho acadêmico, compreendendo como contexto social o desempenho dos colegas de turma socialmente próximos a cada estudante. Tal investigação configura uma contribuição multidisciplinar, envolvendo áreas como Psicologia e Educação, concedendo uma percepção mais acurada acerca da importância da influência social no ambiente educacional. O estudo, que assumirá um caráter descritivo, envolverá a reconstrução das redes sociais presentes em cada turma de forma computacional, possibilitando a aplicação de técnicas de identificação de padrões entre indivíduos e seus pares. Para tanto, pretende-se elaborar e aplicar um questionário em turmas de cursos variados, correlacionando as redes reconstruídas com as tendências das médias das notas dos estudantes. Posteriormente, um conjunto de testes estatísticos será elaborado e aplicado para verificar: (i) se o contexto social dos estudantes causa influência significativa em seu desempenho acadêmico; e (ii) se tal impacto varia de acordo com a área do conhecimento do curso que o aluno frequenta. Para identificar quais membros da turma compõem o contexto social do estudante, pretende-se aplicar a técnica conhecida na literatura científica como detecção de comunidades, que organiza a rede em subgrupos de acordo com a densidade de conexões de cada indivíduo. Evidências encontradas na literatura indicam a existência da influência descrita em turmas do ensino médio; espera-se, portanto, verificar se tal comportamento também se faz presente no ensino superior.
        </Typography>

        <Box padding="6 0 0" crossAlign="center">

          <Button size="large" variant="outlined" color="primary" onClick={() => history.goBack()}>
          Voltar
          </Button>
        </Box>
      </Box>
    );
  }
}

export default ResearchInfo;
