export class FrameTaskQueue {
  private queue: Array<() => void> = [];
  private scheduled = false;

  enqueue(task: () => void) {
    this.queue.push(task);
    if (!this.scheduled) {
      this.scheduled = true;
      requestAnimationFrame(() => this.flush());
    }
  }

  private flush() {
    for (const task of this.queue) task();
    this.queue = [];
    this.scheduled = false;
  }
}
