export class Lattice {
  private cvs: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private dpr: number = window.devicePixelRatio || 1;

  constructor(cvs: HTMLCanvasElement) {
    this.cvs = cvs;
    this.ctx = cvs.getContext("2d")!;

    if (!this.ctx) throw new Error("Failed to get 2D context");

    this.resize();
    this.drawGrid();

    window.addEventListener("resize", () => {
      this.resize();
      this.drawGrid();
    });
  }

  private resize() {
    const dpr = window.devicePixelRatio || 1;
    const bcr = this.cvs.getBoundingClientRect();

    this.dpr = dpr;
    this.cvs.width = bcr.width * dpr;
    this.cvs.height = bcr.height * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  private drawGrid() {
    const { cvs, ctx, dpr } = this;
    const gridSize = 100;
    const gridColor = "#ccc";
    const width = cvs.width / dpr;
    const height = cvs.height / dpr;

    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;

    ctx.beginPath();
    for (let x = 0; x <= width; x += gridSize) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y <= height; y += gridSize) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
  }
}
