import InputMask from "comigo-tech-react-input-mask";
import { Button, Container, Divider, Form, FormField, FormGroup, Icon, Radio } from "semantic-ui-react";

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
  return (
    <div>
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
                <Form.Input required fluid label="Nome" maxLength="100" />

                <Form.Input required fluid label="CPF" width={6}>
                  <InputMask required mask="999.999.999-99" />
                </Form.Input>

                <Form.Input required fluid label="RG" width={6}>
                  <InputMask required mask="999.999.999-99" />
                </Form.Input>
              </Form.Group>

              <FormGroup>
                <Form.Input fluid label="Data Nascimento" width={6}>
                  <InputMask
                    mask="99/99/9999"
                    maskChar={null}
                    placeholder="Ex: 20/03/1985"
                  />
                </Form.Input>
                <Form.Input required fluid label="Frete Celular" width={6}>
                  <InputMask mask="(99) 9999.9999" />
                </Form.Input>

                <Form.Input fluid label="Frete Fixo" width={6}>
                  <InputMask mask="(99) 9999.9999" />
                </Form.Input>

                <Form.Input fluid label="QTD Entregas Realizadas" width={6} />

                <Form.Input fluid label="Valor Por Frete" width={6} />
              </FormGroup>

              <Form.Group>
                <Form.Input fluid label="Rua" width={15} />
                <Form.Input fluid label="Número" width={6}>
                  <InputMask mask="99999" />
                </Form.Input>
              </Form.Group>

              <Form.Group>
                <Form.Input fluid label="Bairro" width={12} />
                <Form.Input fluid label="Cidade" width={6} />
                <Form.Input fluid label="CEP" width={3}>
                  <InputMask mask="99999" />
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
                />
                <FormField>
                </FormField>
                <FormField>
                  <Radio
                    label='Não'
                    name='ativo'
                    value='false'
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
