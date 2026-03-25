import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Button,
    Container,
    Divider,
    Header,
    Icon,
    Modal,
    Table,
} from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function ListProduto() {
  const [lista, setLista] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();

  useEffect(() => {
    carregarLista();
  }, []);

  function carregarLista() {
    axios.get("http://localhost:8080/api/produto").then((response) => {
      setLista(response.data);
    });
  }

  function confirmaRemover(id) {
    setOpenModal(true);
    setIdRemover(id);
  }

  async function remover() {
    await axios
      .delete(`http://localhost:8080/api/produto/${idRemover}`)
      .then(() => {
        console.log("Produto removido com sucesso.");
        carregarLista(); // recarrega a lista após remover
      })
      .catch((error) => {
        console.log("Erro ao remover produto.", error);
      });
    setOpenModal(false);
  }

  // Função para formatar valor monetário
  function formatarValor(valor) {
    if (valor === null || valor === undefined) return "";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  }

  return (
    <div>
      <MenuSistema tela={"produto"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2>Produto</h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Button
              label="Novo"
              circular
              color="orange"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-produto" // CORRIGIDO: agora aponta para o formulário de cadastro
            />

            <br />
            <br />
            <br />

            <Table color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Título</Table.HeaderCell>
                  <Table.HeaderCell>Código</Table.HeaderCell>
                  <Table.HeaderCell>Descrição</Table.HeaderCell>
                  <Table.HeaderCell>Valor Unitário</Table.HeaderCell>
                  <Table.HeaderCell>Tempo Mínimo (min)</Table.HeaderCell>
                  <Table.HeaderCell>Tempo Máximo (min)</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((produto) => (
                  <Table.Row key={produto.id}>
                    <Table.Cell>{produto.titulo}</Table.Cell>
                    <Table.Cell>{produto.codigoProduto}</Table.Cell>{" "}
                    {/* campo corrigido */}
                    <Table.Cell>{produto.descricao}</Table.Cell>
                    <Table.Cell>
                      {formatarValor(produto.valorUnitario)}
                    </Table.Cell>
                    <Table.Cell>{produto.tempoMinimo}</Table.Cell>{" "}
                    {/* campo corrigido */}
                    <Table.Cell>{produto.tempoMaximo}</Table.Cell>{" "}
                    {/* campo corrigido */}
                    <Table.Cell textAlign="center">
                      <Button
                        inverted
                        circular
                        color="green"
                        title="Editar produto"
                        icon
                        as={Link}
                        to="/form-produto"
                        state={{ id: produto.id }}
                      >
                        <Icon name="edit" />
                      </Button>
                      &nbsp;
                      <Button
                        inverted
                        circular
                        color="red"
                        title="Remover produto"
                        icon
                        onClick={() => confirmaRemover(produto.id)}
                      >
                        <Icon name="trash" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Container>
      </div>

      <Modal
        basic
        onClose={() => setOpenModal(false)}
        onOpen={() => setOpenModal(true)}
        open={openModal}
      >
        <Header icon>
          <Icon name="trash" />
          <div style={{ marginTop: "5%" }}>
            Tem certeza que deseja remover esse produto?
          </div>
        </Header>
        <Modal.Actions>
          <Button
            basic
            color="red"
            inverted
            onClick={() => setOpenModal(false)}
          >
            <Icon name="remove" /> Não
          </Button>
          <Button color="green" inverted onClick={remover}>
            <Icon name="checkmark" /> Sim
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
