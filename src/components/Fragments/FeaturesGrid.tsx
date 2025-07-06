import { CheckCircle, Shield, Users, Zap } from "lucide-react";

const FeaturesGrid = () => {
  return (
    <section className="container mx-auto px-4 py-20 bg-muted/20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Segala yang Anda butuhkan untuk tetap produktif
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Fitur-fitur canggih yang dirancang untuk membantu Anda dan tim Anda
          bekerja lebih efisien
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="group relative overflow-hidden rounded-xl border border-border/40 bg-card p-8 hover:shadow-lg transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-chart-1/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Task Management
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Buat, atur, dan lacak tugas Anda dengan antarmuka drag-and-drop
              yang intuitif dan prioritas yang cerdas.
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="group relative overflow-hidden rounded-xl border border-border/40 bg-card p-8 hover:shadow-lg transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-chart-2/5 to-chart-3/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="w-12 h-12 bg-chart-2/10 rounded-lg flex items-center justify-center mb-6">
              <Users className="h-6 w-6 text-chart-2" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Team Collaboration
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Bekerja sama secara lancar dengan pembaruan waktu nyata, komentar,
              dan kemampuan berbagi file.
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="group relative overflow-hidden rounded-xl border border-border/40 bg-card p-8 hover:shadow-lg transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-chart-4/5 to-chart-5/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="w-12 h-12 bg-chart-4/10 rounded-lg flex items-center justify-center mb-6">
              <Zap className="h-6 w-6 text-chart-4" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Smart Automation
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Mengotomatiskan tugas dan alur kerja yang berulang untuk menghemat
              waktu dan mengurangi kesalahan manual.
            </p>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="group relative overflow-hidden rounded-xl border border-border/40 bg-card p-8 hover:shadow-lg transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 to-chart-1/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mb-6">
              <Shield className="h-6 w-6 text-destructive" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Advanced Security
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Keamanan tingkat perusahaan dengan enkripsi menyeluruh dan
              sertifikasi kepatuhan.
            </p>
          </div>
        </div>

        {/* Feature 5 */}
        <div className="group relative overflow-hidden rounded-xl border border-border/40 bg-card p-8 hover:shadow-lg transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-chart-3/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center mb-6">
              <CheckCircle className="h-6 w-6 text-chart-3" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Analytics & Reports
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Dapatkan wawasan tentang produktivitas Anda dengan analisis
              terperinci dan laporan yang dapat disesuaikan.
            </p>
          </div>
        </div>

        {/* Feature 6 */}
        <div className="group relative overflow-hidden rounded-xl border border-border/40 bg-card p-8 hover:shadow-lg transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-chart-5/5 to-chart-2/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="w-12 h-12 bg-chart-5/10 rounded-lg flex items-center justify-center mb-6">
              <Zap className="h-6 w-6 text-chart-5" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Mobile Apps
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Tetap produktif saat bepergian dengan aplikasi seluler asli kami
              untuk iOS dan Android.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default FeaturesGrid;
