import { FC } from "react";

interface Subtask {
   text: string;
   completed: boolean;
}

interface SubtaskListProps {
   subtasks?: Subtask[];
   onToggleSubtaskCompletion: (index: number) => void;
}

const SubtaskList: FC<SubtaskListProps> = ({
   subtasks = [],
   onToggleSubtaskCompletion,
}) => {
   const renderSubtasks = () => {
      if (subtasks.length === 0) {
         return <p>Brak podzadań</p>;
      }

      return subtasks.map((subtask, index) => (
         <div
            key={index}
            onClick={() => onToggleSubtaskCompletion(index)}
            className={`subtask ${subtask.completed ? "completed" : ""}`}
         >
            {subtask.completed ? <s>{subtask.text}</s> : subtask.text}
         </div>
      ));
   };

   return <div>{renderSubtasks()}</div>;
};

export default SubtaskList;
