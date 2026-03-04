import axios from "axios";
import InputMask from "comigo-tech-react-input-mask";
import { useState } from "react";
import { Button, Container, Divider, Form, FormField, FormGroup, Icon, Radio } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

const UF_OPTIONS = [
  { value: 11, text: "RO", key: "uf" },
  { value: 12, text: "AC", key: "uf" },
  { value: 13, text: "AM", key: "uf" },
  { value: 14, text: "RR", key: "uf" },
  { value: 15, text: "PA", key: "uf" },
  { value: 16, text: "AP", key: "uf" },
  { value: 17, text: "TO", key: "uf" },
  { value: 21, text: "MA", key: "uf" },
  { value: 22, text: "PI", key: "uf" },
  { value: 23, text: "CE", key: "uf" },
  { value: 24, text: "RN", key: "uf" },
  { value: 25, text: "PB" },
  { value: 26, text: "PE" },
  { value: 27, text: "AL" },
  { value: 28, text: "SE" },
  { value: 29, text: "BA" },
  { value: 31, text: "MG" },
  { value: 32, text: "ES" },
  { value: 33, text: "RJ" },
  { value: 35, text: "SP" },
  { value: 41, text: "PR" },
  { value: 42, text: "SC" },
  { value: 43, text: "RS" },
  { value: 50, text: "MS" },
  { value: 51, text: "MT" },
  { value: 52, text: "GO" },
  { value: 53, text: "DF" },
];

export default function FormEntregador() {

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [foneCelular, setFoneCelular] = useState("");
  const [foneFixo, setFoneFixo] = useState("");
  const [qtdEntregasRealizadas, setQtdEntregasRealizadas] = useState("");
  const [valorFrete, setValorFrete] = useState("");
  const [enderecoBairro, setEnderecoBairro] = useState("");
  const [enderecoCep, setEnderecoCep] = useState("");
  const [enderecoCidade, setEnderecoCidade] = useState("");
  const [enderecoComplemento, setEnderecoComplemento] = useState("");
  const [enderecoNumero, setEnderecoNumero] = useState("");
  const [enderecoRua, setEnderecoRua] = useState("");
  const [enderecoUf, setEnderecoUf] = useState("");
  const [ativo, setAtivo] = useState(false);

  function salvar() {
    let entregadorRequest = {
      nome: nome,
      cpf: cpf,
      dataNascimento: dataNascimento,
      foneCelular: foneCelular,
      foneFixo: foneFixo,
      qtdEntregasRealizadas: qtdEntregasRealizadas,
      valorFrete: valorFrete,
      enderecoBairro: enderecoBairro,
      enderecoCep: enderecoCep,
      enderecoCidade: enderecoCidade,
      enderecoComplemento: enderecoComplemento,
      enderecoNumero: enderecoNumero,
      enderecoRua: enderecoRua,
      enderecoUf: enderecoUf,
      ativo: ativo,
    };

    function handleAtivoChange(e, { value }) {
      setAtivo(value === "true");
    }


    axios.post("http://localhost:8080/api/entregador", entregadorRequest)
      .then((response) => {
        console.log("Entregador cadastrado com sucesso");
      })
      .catch((error) => {
        console.error("Erro ao incluir um entregador")
      })
  }

  return (
    <div>
      <MenuSistema tela={'entregador'} />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2>
            {" "}
            <span style={{ color: "darkgray" }}>
              {" "}
              Entregador &nbsp;
              <Icon name="angle double right" size="small" />{" "}
            </span>{" "}
            Cadastro{" "}
          </h2>

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths="equal">
                <Form.Input required fluid label="Nome" maxLength="100"
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                />

                <Form.Input required fluid label="CPF" width={6}>
                  <InputMask required mask="999.999.999-99"
                    value={cpf}
                    onChange={e => setCpf(e.target.value)}
                  />
                </Form.Input>

                <Form.Input required fluid label="RG" width={6}>
                  <InputMask required mask="999.999.999-99"
                    value={rg}
                    onChange={e => setRg(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>

              <FormGroup>
                <Form.Input fluid label="Data Nascimento" width={6}>
                  <InputMask
                    mask="99/99/9999"
                    maskChar={null}
                    placeholder="Ex: 20/03/1985"
                    value={dataNascimento}
                    onChange={e => setDataNascimento(e.target.value)}
                  />
                </Form.Input>
                <Form.Input required fluid label="Frete Celular" width={6}>
                  <InputMask mask="(99) 9999.9999"
                    value={foneCelular}
                    onChange={e => setFoneCelular(e.target.value)}
                  />
                </Form.Input>

                <Form.Input fluid label="Frete Fixo" width={6}>
                  <InputMask mask="(99) 9999.9999"
                    value={foneFixo}
                    onChange={e => setFoneFixo(e.target.value)}
                  />
                </Form.Input>

                <Form.Input fluid label="QTD Entregas Realizadas" width={6}
                  value={qtdEntregasRealizadas}
                  onChange={e => setQtdEntregasRealizadas(e.target.value)}
                />

                <Form.Input fluid label="Valor Por Frete" width={6}
                  value={valorFrete}
                  onChange={e => setValorFrete(e.target.value)}
                />
              </FormGroup>

              <Form.Group>
                <Form.Input fluid label="Rua" width={15}
                  value={enderecoRua}
                  onChange={e => setEnderecoRua(e.target.value)}
                />
                <Form.Input fluid label="Número" width={6}>
                  <InputMask mask="99999"
                    value={enderecoNumero}
                    onChange={e => setEnderecoNumero(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>

              <Form.Group>
                <Form.Input fluid label="Bairro" width={12}
                  value={enderecoBairro}
                  onChange={e => setEnderecoBairro(e.target.value)}
                />
                <Form.Input fluid label="Cidade" width={6}
                  value={enderecoCidade}
                  onChange={e => setEnderecoCidade(e.target.value)}
                />
                <Form.Input fluid label="CEP" width={3}>
                  <InputMask mask="99999-999"
                    value={enderecoCep}
                    onChange={e => setEnderecoCep(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>

              <Form.Dropdown button basic fluid label="UF" options={UF_OPTIONS} width={18} placeholder="  " />
              <Form.Input fluid label="Complemento" />
              <Form.Group>
                <FormField fluid label="Ativo:" />
                <Radio
                  label='Sim'
                  name='ativo'
                  value='true'
                  checked={ativo === true}
                  onChange={handleAtivoChange}
                />
                <FormField>
                </FormField>
                <FormField>
                  <Radio
                    label='Não'
                    name='ativo'
                    value='false'
                    checked={ativo === true}
                    onChange={handleAtivoChange}
                  />
                </FormField>
              </Form.Group>
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Button
                type="button"
                inverted
                circular
                icon
                labelPosition="left"
                color="orange"
              >
                <Icon name="reply" />
                Voltar
              </Button>

              <Button
                inverted
                circular
                icon
                labelPosition="left"
                color="blue"
                floated="right"
                onClick={salvar}
              >
                <Icon name="save" />
                Salvar
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
