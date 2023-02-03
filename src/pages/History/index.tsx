import { useCallback, useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";
import { HistoryContainer, HistoryList, Status } from "./styles";
import ptBR from "date-fns/esm/locale/pt-BR/index.js";
import { formatDistanceToNow } from "date-fns";
import { Infinity, Trash } from "phosphor-react";

export function History() {
  const { cycles, deleteCycle } = useContext(CyclesContext);

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {cycles?.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.stopWatch ? "Cronômetro" : cycle.task}</td>
                  <td>
                    {cycle.stopWatch ? (
                      <Infinity size={24} />
                    ) : (
                      cycle.minutesAmount + "minutos"
                    )}
                  </td>
                  <td>
                    {formatDistanceToNow(new Date(cycle.startDate), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    {cycle.finishedDate && (
                      <Status statusColor="green">Concluído</Status>
                    )}
                    {cycle.interrupedDate && (
                      <Status statusColor="red">Interrompido</Status>
                    )}
                    {!cycle.interrupedDate && !cycle.finishedDate && (
                      <Status statusColor="yellow">Em andamento</Status>
                    )}
                  </td>
                  <td onClick={() => deleteCycle(cycle.id)}>
                    {<Trash size={30} />}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
