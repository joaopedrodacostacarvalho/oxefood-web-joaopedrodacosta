import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import InputMask from "comigo-tech-react-input-mask";
import MenuSistema from "../../MenuSistema";
import { notifyError, notifySuccess } from "../../views/util/Util";

export default function FormProduto() {
  const { state } = useLocation();
  const [idProduto, setIdProduto] = useState();

  const [titulo, setTitulo] = useState("");
  const [codigoProduto, setCodigoProduto] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valorUnitario, setValorUnitario] = useState("");
  const [tempoMinimo, setTempoMinimo] = useState("");
  const [tempoMaximo, setTempoMaximo] = useState("");

  useEffect(() => {
    if (state?.id) {
      axios
        .get(`http://localhost:8080/api/produto/${state.id}`)
        .then((response) => {
          setIdProduto(response.data.id);
          setTitulo(response.data.titulo);
          setCodigoProduto(response.data.codigoProduto);
          setDescricao(response.data.descricao);
          setValorUnitario(response.data.valorUnitario);
          setTempoMinimo(response.data.tempoMinimo);
          setTempoMaximo(response.data.tempoMaximo);
        })
        .catch((error) => {
          notifyError("Erro ao carregar produto para edição.");
        });
    }
  }, [state]);

  function salvar() {
    const produtoRequest = {
      titulo,
      codigoProduto,
      descricao,
      valorUnitario,
      tempoMinimo,
      tempoMaximo,
    };

    const request = idProduto
      ? axios.put(
          `http://localhost:8080/api/produto/${idProduto}`,
          produtoRequest,
        )
      : axios.post("http://localhost:8080/api/produto", produtoRequest);

    request
      .then(() => {
        notifySuccess(
          idProduto
            ? "Produto alterado com sucesso."
            : "Produto cadastrado com sucesso.",
        );
      })
      .catch((error) => {
        if (error.response?.data?.errors) {
          error.response.data.errors.forEach((err) =>
            notifyError(err.defaultMessage),
          );
        } else {
          notifyError(
            error.response?.data?.message || "Erro ao salvar produto.",
          );
        }
      });
  }

  return (
    <div>
      <MenuSistema tela={"produto"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2>
            <span style={{ color: "darkgray" }}>
              Produto &nbsp;
              <Icon name="angle double right" size="small" />
            </span>
            {idProduto ? "Alteração" : "Cadastro"}
          </h2>
          <Divider />
          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Título"
                  maxLength="100"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
                <Form.Input
                  required
                  fluid
                  label="Código do Produto"
                  value={codigoProduto}
                  onChange={(e) => setCodigoProduto(e.target.value)}
                />
              </Form.Group>

              <Form.TextArea
                fluid
                label="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />

              <Form.Group>
                <Form.Input fluid label="Valor Unitário" width={6}>
                  <InputMask
                    mask="9999.99"
                    placeholder="0.00"
                    value={valorUnitario}
                    onChange={(e) => setValorUnitario(e.target.value)}
                  />
                </Form.Input>

                <Form.Input
                  fluid
                  label="Tempo de Entrega Mínimo (min)"
                  width={6}
                  type="number"
                  value={tempoMinimo}
                  onChange={(e) => setTempoMinimo(e.target.value)}
                />

                <Form.Input
                  fluid
                  label="Tempo de Entrega Máximo (min)"
                  width={6}
                  type="number"
                  value={tempoMaximo}
                  onChange={(e) => setTempoMaximo(e.target.value)}
                />
              </Form.Group>
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Link to="/list-produto">
                <Button
                  type="button"
                  inverted
                  circular
                  icon
                  labelPosition="left"
                  color="orange"
                >
                  <Icon name="reply" /> Voltar
                </Button>
              </Link>
              <Button
                inverted
                circular
                icon
                labelPosition="left"
                color="blue"
                floated="right"
                onClick={() => salvar()}
              >
                <Icon name="save" /> Salvar
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
