import { Goal } from "./Goals";

interface IProps {
  goal: Goal;
  isShowDeleteButton: boolean;
  handleRemoveGoal: (goalID: string) => void;
}

function GoalItem({ goal, isShowDeleteButton, handleRemoveGoal }: IProps) {
  return (
    <div key={goal._id} className="goal-item">
      <span>{goal.text}</span>
      {isShowDeleteButton && (
        <button
          className="remove-btn"
          onClick={() => {
            if (goal._id != null) {
              handleRemoveGoal(goal._id);
            }
          }}
        >
          -
        </button>
      )}
    </div>
  );
}

export default GoalItem;
