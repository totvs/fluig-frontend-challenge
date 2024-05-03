/** Class representing a task entity. */
class TaskEntity {
  /**
  * Create a task.
  * @param {Object} props - The task of project.
  * @param {string} props.id - The id of the task.
  * @param {string} props.title - The task's title.
  * @param {string} props.description - The task's description.
  * @param {number} props.status - The task's status.
  * @param {string} props.createdDate - The task's createdDate.
  * @param {string} props.deadlineDate - The task's deadlineDate.
  * @param {string} props.lastStatusUpdateDate - The task's lastStatusUpdateDate.
  */
  constructor(props) {
    this.props = props
  }
  /**
   *  Get the prop id.
   *  @returns {string} task id.
   */
  get id() {
    return this.props.id
  }
  /**
   *  Get the prop title.
   *  @returns {string} task title.
   */
  get title() {
    return this.props.title
  }
  /**
   *  Get the prop description.
   *  @returns {string} task description.
   */
  get description() {
    return this.props.description
  }
  /**
   *  Get the prop status.
   *  @returns {number} task status id.
   */
  get status() {
    return this.props.status
  }
  /**
   *  Get the prop createdDate.
   *  @returns {string} task createdDate.
   */
  get createdDate() {

    return this.props.createdDate
  }
  /**
   *  Get the prop deadlineDate.
   *  @returns {string} task deadlineDate.
   */
  get deadlineDate() {
    return this.props.deadlineDate
  }
  /**
   *  Get the prop lastStatusUpdateDate.
   *  @returns {string} task lastStatusUpdateDate.
   */
  get lastStatusUpdateDate() {
    return this.props.lastStatusUpdateDate
  }
}

export default TaskEntity
